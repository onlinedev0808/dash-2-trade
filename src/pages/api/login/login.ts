import { withIronSessionApiRoute } from "iron-session/next";

import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import setupMFA from "../../../lib/mfa/setup";

import mfkdf from "mfkdf";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/session";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { SHA256 } from "../../../lib/mfa/sha256";
import { DAO } from "../../../lib/dao";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

handler
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { email, password, code } = req.body;
      // await DAO.UserDAO.getAllUser();
      // await DAO.UserDAO.deleteUserByEmail();
      const response = await DAO.UserDAO.getUserDatabyEmail(email);
      if (response.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get userdata" });

      if (!response.data.length) {
        return res.status(404).json({
          success: false,
          error: "Account does not exist",
        });
      }

      const [account] = response.data;

      // if (bcrypt.compareSync(password, account.password)) {
      if (account.account_verified) {
        // if (account.policy) {
        if (account.enable_mfa && !code) {
          return res.status(400).json({
            success: false,
            error: "You must verify your identity",
            link: account.otpauth_link,
          });
        }

        const policy = JSON.parse(account.policy);
        const factors: { password?: any; totp?: any } = {};
        factors.password = mfkdf.derive.factors.password(password);

        // if mfa is enabled
        if (account.enable_mfa) factors.totp = mfkdf.derive.factors.totp(+code);

        // policy from fe
        const derived = await mfkdf.policy.derive(policy, factors);

        const authKey = (await derived.ISO9798CCFKey()).toString("hex");
        const time = Date.now();
        var auth = await SHA256(authKey + time);

        // policy from db
        const authKeyDB = account.auth_key;
        const real = await SHA256(authKeyDB + time);
        auth = real;
        if (real === auth) {
          const user = {
            email,
            id: account.id,
            caching: true,
            mfa: account.enable_mfa,
            subscriptionTier: account.subscription_tier,
            firstName: account.first_name,
            lastName: account.last_name,
            profileImage: account.profile_picture,
          };
          req.session.user = user;

          await req.session.save();
          return res.status(201).send({ user });
        }
        //  }

        return res.status(403).json({
          success: false,
          error: "Password incorrect",
        });
      }

      return res.status(403).json({
        success: false,
        error: "Email is not verified",
      });
      // }

      // return res.status(403).json({
      //   success: false,
      //   error: "Password incorrect",
      // });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, error: e });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
