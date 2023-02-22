import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import makeCachedRequest from "../../../../lib/cacherequest";
import { sessionOptions } from "../../../../lib/session";
import { applyRateLimitMiddleware } from "../../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../../lib/middlewares/auth";
import SERVER_BASE_URL from "../../../../constant/backend";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const { tokenId } = req.query;
    try {
      const response = await makeCachedRequest(
        5,
        `${SERVER_BASE_URL}/presales/${tokenId}`,
        req.session.user?.caching
      );
      res.json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
