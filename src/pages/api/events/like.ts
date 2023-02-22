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
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (!req.session.user) return res.status(200).json("");
      const connection = mysql.createConnection(process.env.DATABASE_URL);

      const table = "message_likes";

      const messageId = req.body.id;

      if (!messageId) {
        return res
          .status(500)
          .json({ success: false, error: "messageId is empty" });
      }

      const response = await DAO.UserDAO.getIDbyEmail(req.session.user.email);
      if (response.status == false)
        return res.status(403).json({ success: false, error: "Can't get ID" });

      const [userId] = response.data;

      const response1 = await DAO.EventDAO.getDataById(
        table,
        messageId,
        userId[0].id
      );
      if (response1.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get message by id" });

      if (response1.data.length) {
        const response2 = await DAO.EventDAO.updateData(
          table,
          response1.data[0],
          messageId,
          userId[0].id
        );
        if (response2.status == false)
          return res
            .status(403)
            .json({ success: false, error: "Can't update message" });
      } else {
        const response2 = await DAO.EventDAO.creatData(
          table,
          messageId,
          userId[0].id
        );
        if (response2.status == false)
          return res
            .status(403)
            .json({ success: false, error: "Can't creat message" });
      }

      const response2 = await DAO.EventDAO.countData(
        table,
        messageId,
        userId[0].id
      );
      if (response2.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't creat message" });

      return res
        .status(200)
        .json({ count: response2.data[0] ? response2.data[0].num : 0 });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });
export default withIronSessionApiRoute(handler, sessionOptions);
