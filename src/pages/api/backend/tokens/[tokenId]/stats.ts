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
      const { tokenId } = req.query;
      const response = await makeCachedRequest(
        15,
        `https://d2t.info/cryptocurrency/stats?id=${tokenId}&logo=true`,
        req.session.user?.caching
      );

      if (!response.data.length) {
        return res.json({});
      }

      const result = response.data.map((item, index) => ({
        id: index + 1,
        tokenId: item.id,
        symbol: item.symbol,
        name: item.name,
        rank: item.rank,
        logo: item.logo,
        volume: item.stats.volume,
        marketCap: item.stats.market_cap,
        priceMin: item.stats.price_range[0],
        priceMax: item.stats.price_range[1],
        priceChange: item.stats.price_change,
        priceCurrent: item.stats.curr_price,
      }));

      res.json(result[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
