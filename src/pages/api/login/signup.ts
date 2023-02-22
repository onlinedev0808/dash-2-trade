import absoluteUrl from "next-absolute-url";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "./send-email";
// import Dao from "../../../services/db/Dao";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import setupMFA from "../../../lib/mfa/setup";
import { DAO } from "../../../lib/dao";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

handler
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { email, password, agreedToReceiveNewsletters } = req.body;

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      // await DAO.UserDAO.deleteUserByEmail();
      // await DAO.UserDAO.getAllUser();
      const response_data = await DAO.UserDAO.getUserDatabyEmail(email);
      if (response_data.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get user_data" });
      if (response_data.data?.length) {
        // connection.end();
        return res
          .status(400)
          .json({ success: false, error: "Email already exists" });
      }

      const { origin } = absoluteUrl(req);
      const code = uuidv4();

      const { setup } = await setupMFA(password);
      const policyMFA = JSON.stringify(setup.policy);

      // const otpAuthLink = mfaSetup.outputs.totp.uri;
      const authKey = (await setup.ISO9798CCFKey()).toString("hex");

      const response = await DAO.UserDAO.signUp(
        email,
        hash,
        0,
        JSON.stringify([]),
        code,
        agreedToReceiveNewsletters || 0,
        0,
        authKey,
        policyMFA,
        ""
      );
      if (response.status == false)
        return res
          .status(403)
          .json({ success: false, error: "SignUp Failure" });
      sendEmail(origin, code, email);
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, error: e });
    }
  });

export default handler;
