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
      const {
        // presale = false,
        // source = "discord",
        // compare = "absolute",
        // interval = "week",
        is_presale = false,
        limit = "10",
      } = req.query;
      const url = `${SERVER_BASE_URL}/social-metrics/top-activity?is_presale=${is_presale}&limit=${limit}`;
      const response = await makeCachedRequest(
        15,
        url,
        req.session.user?.caching
      );
      // cryptocurrency/top-social-activity?presale=${presale}&source=${source}&compare=${compare}&interval=${interval}&limit=${limit}

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
