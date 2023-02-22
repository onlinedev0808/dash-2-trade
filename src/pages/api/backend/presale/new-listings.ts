import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { applyRateLimitMiddleware } from "../../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../../lib/middlewares/auth";

import { sessionOptions } from "../../../../lib/session";
import SERVER_BASE_URL from "../../../../constant/backend";
import makeCachedRequest from "../../../../lib/cacherequest";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const url = `${SERVER_BASE_URL}/presales/new-listings?limit=5`;
      const response = await makeCachedRequest(
        19,
        url,
        req.session.user?.caching
      );

      if (response.success) {
        res.json(response.data);
      } else {
        res.status(500).json(response);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
