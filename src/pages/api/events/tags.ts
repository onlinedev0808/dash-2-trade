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
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (!req.session.user) return res.status(200).json("");
      const connection = mysql.createConnection(process.env.DATABASE_URL);

      const response = await DAO.EventDAO.getAllTag();

      connection.end();
      return res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });
export default withIronSessionApiRoute(handler, sessionOptions);
