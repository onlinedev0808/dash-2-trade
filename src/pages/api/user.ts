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
      const { walletAddress } = req.body;

      // see if user exists
      const db = await Dao.getDbInstance();
      const collection = db.collection("Users");
      const user = await collection.findOne({ address: walletAddress });

      if (user == null) {
        await collection.insertOne({
          address: walletAddress,
          watchlists: [],
        });
      }
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
