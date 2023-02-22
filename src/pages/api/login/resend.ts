import absoluteUrl from "next-absolute-url";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { sendEmail } from "./send-email";
// import Dao from "../../../services/db/Dao";
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
      if (!response_data.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get user data" });
      if (!response_data.data?.length) {
        // connection.end();
        return res
          .status(404)
          .json({ success: false, error: "Email dose not exist" });
      }

      const [account] = response_data.data;

      const { origin } = absoluteUrl(req);

      await sendEmail(origin, account.verification_code, email);
      return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e });
    }
  });

export default handler;
