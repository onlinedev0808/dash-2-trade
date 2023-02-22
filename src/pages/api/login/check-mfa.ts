import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/session";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { DAO } from "../../../lib/dao";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

handler
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { email } = req.body;

      const response_data = await DAO.UserDAO.getUserDatabyEmail(email);

      // if(response_data.status == false){
      //   return res.status(403).json({
      //     success: false,
      //     error: "Can not get user data by email",
      //   });
      // }

      if (!response_data.data.length) {
        return res.status(404).json({
          success: false,
          error: "Account does not exist",
        });
      }

      const [account] = response_data.data;

      return res.status(200).json({
        success: true,
        enableMFA: account.enable_mfa || false,
        otp: account.otpauth_link,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, error: e });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
