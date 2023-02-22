import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";

import { sessionOptions } from "../../../lib/session";
import { DAO } from "../../../lib/dao";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { email } = req.body;

      const response = await DAO.UserDAO.getUserDatabyEmail(email);
      if (response.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get userdata" });
      if (!response.data?.length) {
        return res
          .status(400)
          .json({ success: false, error: "Account doesn't exist" });
      }

      return res.status(200).json({ link: response.data[0].otpauth_link });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ success: false, error: e });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
