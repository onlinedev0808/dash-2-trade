import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../../../lib/session";
import makeCachedRequest from "../../../../../lib/cacherequest";
import { applyRateLimitMiddleware } from "../../../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../../../lib/middlewares/auth";
import SERVER_BASE_URL from "../../../../../constant/backend";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { tokenId } = req.query;
      const { data } = await makeCachedRequest(
        14,
        `${SERVER_BASE_URL}/crypto/detail/${tokenId}`,
        req.session.user?.caching
      );

      if (!data) {
        return res.json({});
      }

      // res.json({
      //   id: data.id,
      //   symbol: data.symbol,
      //   name: data.name,
      //   rank: data.rank,
      //   devActivity: data.metrics.developer_activity,
      //   devActivityDelta: data.metrics.developer_activity_change,
      //   socialVolume: data.metrics.social_volume,
      //   socialVolumeDelta: data.metrics.social_volume_change,
      //   socialSentiment: data.metrics.sentiment,
      //   socialSentimentTrend: data.metrics.sentiment_trend,
      // });
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
