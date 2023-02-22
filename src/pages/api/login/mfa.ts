import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import mfkdf from "mfkdf";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";
import { sessionOptions } from "../../../lib/session";
import setupMFA from "../../../lib/mfa/setup";
import { SHA256 } from "../../../lib/mfa/sha256";
import { DAO } from "../../../lib/dao";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { enableMFA, password, code } = req.body;

      const response_data = await DAO.UserDAO.getUserDatabyId(
        req.session.user.id
      );
      if (response_data.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get userdata" });
      if (!response_data.data?.length) {
        // connection.end();
        return res
          .status(404)
          .json({ success: false, error: "Account does not exist" });
      }

      const [account] = response_data.data;

      if (account.account_verified) {
        const policy = JSON.parse(account.policy);
        const factors: { password?: any; totp?: any } = {};
        factors.password = mfkdf.derive.factors.password(password);

        // if mfa is enabled
        if (account.enable_mfa) factors.totp = mfkdf.derive.factors.totp(+code);

        // policy from fe
        const derived = await mfkdf.policy.derive(policy, factors);

        const authKey = (await derived.ISO9798CCFKey()).toString("hex");
        const time = Date.now();
        const auth = await SHA256(authKey + time);

        // policy from db
        const authKeyDB = account.auth_key;
        const real = await SHA256(authKeyDB + time);

        if (real === auth) {
          const { setup } = await setupMFA(password, enableMFA);
          const policyMFA = JSON.stringify(setup.policy);

          let otpAuthLink = "";
          if (enableMFA) {
            const inner: any = Object.values(setup.outputs)[0];
            const totp = inner.outputs.totp;
            otpAuthLink = totp.uri;
          }

          const authKeyNew = (await setup.ISO9798CCFKey()).toString("hex");

          const response_data1 = await DAO.UserDAO.updateUserMFA(
            enableMFA,
            authKeyNew,
            policyMFA,
            otpAuthLink,
            account.id
          );
          if (response_data1.status == false)
            return res
              .status(403)
              .json({ success: false, error: "Update UserMFA failure" });
          const user = {
            email: account.email,
            id: account.id,
            caching: true,
            key: "",
            mfa: enableMFA,
          };

          return res.status(200).send({ user });
        }

        return res.status(403).json({
          success: false,
          error: "Password incorrect",
        });
      }

      return res.status(403).json({
        success: false,
        error: "Email is not verified",
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
