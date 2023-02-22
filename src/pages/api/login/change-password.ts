import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import bcrypt from "bcryptjs";
import absoluteUrl from "next-absolute-url";
import { v4 as uuidv4 } from "uuid";
import { addHours } from "date-fns";
import mfkdf from "mfkdf";
import type { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/session";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { sendEmail } from "../../../lib/send-email";
import { IMFKDFFactors } from "../../../types/interfaces";
import { SHA256 } from "../../../lib/mfa/sha256";
import { DAO } from "../../../lib/dao";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");
// var ObjectId = require("mongodb").ObjectId;

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { oldPassword, newPassword, code } = req.body;
      const user = req.session.user;
      if (!user)
        return res.status(404).json({
          success: false,
          error: "Invalid Request",
        });

      const response_data = await DAO.UserDAO.getUserDatabyId(user.id);

      if (response_data.status == false) {
        return res.status(403).json({
          success: false,
          error: "Can not find this user data by ID",
        });
      }

      if (!response_data.data.length) {
        // connection.end();
        return res.status(404).json({
          success: false,
          error: "Invalid request",
        });
      }

      const [account] = response_data.data;

      if (account.enable_mfa && !code) {
        return res.status(400).json({
          success: false,
          error: "You must verify your identity",
          link: account.otpauth_link,
        });
      }

      const salt = bcrypt.genSaltSync(10);

      const { origin } = absoluteUrl(req);
      const token = uuidv4();
      const emailData = `
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title></title>
          </head>
          <body>
          Please, follow this link to complete changing your password: <a href="${origin}/reset/password?code=${token}" target="_blank">Reset</a>
          </body>
          </html>`;

      const factors: IMFKDFFactors = {
        password: mfkdf.derive.factors.password(oldPassword),
      };

      if (account.enable_mfa) {
        factors.totp = mfkdf.derive.factors.totp(+code);
      }

      const derived = await mfkdf.policy.derive(
        JSON.parse(account.policy),
        factors
      );

      const key = (await derived.ISO9798CCFKey()).toString("hex");
      const time = Date.now();
      const auth = await SHA256(key + time);

      const authKeyDB = account.auth_key;
      const real = await SHA256(authKeyDB + time);

      if (real !== auth) {
        return res.status(403).json({
          success: false,
          error: "Password incorrect",
        });
      }

      let outer;

      if (account.enable_mfa) {
        outer = derived;
        const inner: any = Object.values(outer.outputs)[0];

        await inner.recoverFactor(
          await mfkdf.setup.factors.password(newPassword, { id: "password" })
        );

        outer.policy.factors[0].params = inner.policy;
      } else {
        outer = await mfkdf.policy.derive(JSON.parse(account.policy), factors);

        await outer.recoverFactor(
          await mfkdf.setup.factors.password(newPassword, { id: "password" })
        );
      }

      const authKey = (await outer.ISO9798CCFKey()).toString("hex");
      const policyMFA = JSON.stringify(outer.policy);

      const respons_data = await DAO.UserDAO.changeUserPassWord(
        bcrypt.hashSync(newPassword, salt),
        token,
        addHours(new Date(), 2).getTime(),
        policyMFA,
        authKey,
        account.id
      );

      if (respons_data.status == false) {
        return res.status(403).json({
          success: false,
          error: "Can not Change Password",
        });
      }

      await sendEmail(emailData, req.session.user.email);

      // connection.end();
      return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, error: e });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
