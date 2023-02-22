import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { DAO } from "../../../lib/dao";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (!req.session.user) return res.status(200).json("");

      const response = await DAO.UserDAO.getIDbyEmail(req.session.user.email);
      if (response.status == false)
        return res.status(403).json({ success: false, error: "Can't get ID" });
      const [userId] = response.data;

      const messageId = req.body.id;

      if (!messageId) {
        return res
          .status(500)
          .json({ success: false, error: "messageId is empty" });
      }

      const response1 = await DAO.MessageDAO.updateMessage_recipient(
        messageId,
        userId[0].id
      );
      if (response1.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't update message" });
      return res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });
export default withIronSessionApiRoute(handler, sessionOptions);
