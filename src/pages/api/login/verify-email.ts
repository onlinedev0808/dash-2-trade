import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { addMonths } from "date-fns";
import absoluteUrl from "next-absolute-url";
import { v4 as uuidv4 } from "uuid";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";
import { sessionOptions } from "../../../lib/session";

import { sendEmail } from "../../../lib/send-email";
import { DAO } from "../../../lib/dao";
import { RssIcon } from "@heroicons/react/solid";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { code } = req.body;

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

      if (account.verification_code !== code) {
        return res
          .status(403)
          .json({ success: false, error: "Tokens don't match" });
      }

      if (new Date().getTime() > account.token_expires) {
        return res
          .status(403)
          .json({ success: false, error: "Verification token expired" });
      }

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
      Your Dash2Trade email was changed, if it wasn't you, please follow this link to reset changes: <a href="${origin}/reset?code=${token}&email=${account.temp_email}" target="_blank">Reset</a>
      </body>
      </html>`;

      await sendEmail(emailData, req.session.user.email);

      const response_data = await DAO.UserDAO.verifyEmail(
        account.email,
        account.temp_email,
        token,
        addMonths(new Date(), 1).getTime(),
        "",
        req.session.user.id
      );
      if (response_data.status == false)
        return res
          .status(403)
          .json({ success: false, error: "VerifyEmail Failure" });
      return res.status(200).send({ user: { email: account.temp_email } });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
