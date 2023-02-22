import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import Dao from "../../services/db/Dao";
import { applyAuthMiddleware } from "../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../utils/rate-limit";

import { sessionOptions } from "../../lib/session";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const db = await Dao.getDbInstance();
      const collection = db.collection("CMS");
      const result = await collection.findOne({ type: "risk-profiler" });

      res.json({ result });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
