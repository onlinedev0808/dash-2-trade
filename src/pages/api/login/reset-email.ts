import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { sessionOptions } from "../../../lib/session";
import { DAO } from "../../../lib/dao";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

handler
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { code, email } = req.body;

      if (!code || !email)
        return res.status(400).json({ success: false, error: "Bad request" });

      const response_data = await DAO.UserDAO.getUserDatabyEmail(email);
      if (!response_data.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get user data" });

      if (!response_data.data?.length) {
        // connection.end();
        return res
          .status(404)
          .json({ success: false, error: "Account does not exist" });
      }

      const [account] = response_data.data;

      if (account.reset_email_token !== code) {
        return res
          .status(403)
          .json({ success: false, error: "Tokens don't match" });
      }

      if (new Date().getTime() > account.reset_token_expires) {
        return res
          .status(403)
          .json({ success: false, error: "Verification token expired" });
      }

      const response_data1 = await DAO.UserDAO.resetEmail(
        email,
        "",
        "",
        account.id
      );
      if (!response_data1.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Reset email failure" });

      return res.status(200).send({ success: true });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
