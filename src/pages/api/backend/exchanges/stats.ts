import nextConnect from "next-connect";
//import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import { applyRateLimitMiddleware } from "../../../../utils/rate-limit";
import SERVER_BASE_URL from "../../../../constant/backend";
import makeCachedRequest from "../../../../lib/cacherequest";
import { sessionOptions } from "../../../../lib/session";
import { applyAuthMiddleware } from "../../../../lib/middlewares/auth";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { limit = 5 } = req.query;
      const url = `${SERVER_BASE_URL}/exchanges/stats?limit=${limit}`;
      const response = await makeCachedRequest(
        15,
        url,
        req.session.user?.caching
      );

      if (response.success) {
        res.json(response.data || {});
      } else {
        res.status(500).json(response);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
