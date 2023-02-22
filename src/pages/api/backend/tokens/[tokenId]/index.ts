import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import makeCachedRequest from "../../../../../lib/cacherequest";
import { sessionOptions } from "../../../../../lib/session";
import { applyRateLimitMiddleware } from "../../../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../../../lib/middlewares/auth";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { tokenId, time_range } = req.query;
      const response = await makeCachedRequest(
        7,
        `https://d2t.info/tokens/${tokenId}/prices?time_range=${time_range}`,
        req.session.user?.caching
      );
      const result = response.data.map((obj) => [
        obj.timestamp * 1000,
        obj.value,
      ]);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
