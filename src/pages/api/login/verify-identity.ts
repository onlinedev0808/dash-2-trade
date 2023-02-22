import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
// import Dao from "../../../services/db/Dao";

import mfkdf from "mfkdf";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";
import { sessionOptions } from "../../../lib/session";
import { IMFKDFFactors } from "../../../types/interfaces";
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
      const { password, code } = req.body;

      // const connection = mysql.createConnection(process.env.DATABASE_URL);

      // const [accounts] = await connection
      //   .promise()
      //   .query(`SELECT * FROM users WHERE id = ?`, [req.session.user.id]);

      const response = await DAO.UserDAO.getUserDatabyId(req.session.user.id);
      if (response.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get userdata" });
      if (!response.data?.length) {
        // connection.end();
        return res
          .status(404)
          .json({ success: false, error: "Account does not exist" });
      }

      const [account] = response.data;

      if (account.account_verified) {
        const policy = JSON.parse(account.policy);
        const factors: IMFKDFFactors = {};
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
          // connection.end();
          return res.status(200).send({ success: true });
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
