import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";

import { sessionOptions } from "../../../lib/session";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { DAO } from "../../../lib/dao";
import { DocumentAddIcon } from "@heroicons/react/solid";
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
          .json({ success: false, error: "Can not get userdata" });

      if (!response.data.length) {
        // connection.end();
        return res.status(404).json({
          success: false,
          error: "Account does not exist",
        });
      }

      const [account] = response.data;

      if (code !== account.verification_code) {
        return res
          .status(403)
          .json({ success: false, error: "Tokens don't match" });
      }

      if (new Date().getTime() > account.token_expires) {
        return res
          .status(403)
          .json({ success: false, error: "Verification token expired" });
      }

      const response_data = await DAO.UserDAO.conformChangePassWord(
        account.temp_password,
        account.temp_policy,
        "",
        account.temp_authkey,
        "",
        "",
        "",
        account.id
      );
      if (response_data.status == false)
        return res.status(403).json({ success: false });
      else return res.status(200).json({ success: true });
    } catch (e) {
      console.log(e);
      res.status(500).json({ success: false, error: e });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
