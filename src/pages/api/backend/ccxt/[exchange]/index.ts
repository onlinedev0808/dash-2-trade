import nextConnect from "next-connect";
import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import ccxt from "ccxt";
import { makeCachedRequestForCcxt } from "../../../../../lib/cacherequest";
import { applyRateLimitMiddleware } from "../../../../../utils/rate-limit";
import { sessionOptions } from "../../../../../lib/session";
import { applyAuthMiddleware } from "../../../../../lib/middlewares/auth";

const handler = nextConnect();

const fetchOHLCV = async (exchange, symbol, timeRange, since, limit) => {
  try {
    const exchangeEntity = new ccxt[exchange]({
      enableRateLimit: true,
    });

    if (exchangeEntity.has.fetchOHLCV) {
      const result = await exchangeEntity.fetchOHLCV(
        symbol,
        timeRange,
        since,
        limit
      );

      if (result) {
        return result;
      }

      return false;
    }
    return false;
  } catch (e) {
    return false;
  }
};

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { exchange, symbol, time_range } = req.query;
      const isUsingCache = req.session.user?.caching;
      //const since = Date.now() - 24 * 60 * 60 * 1000;
      let result: any;
      if (isUsingCache) {
        result = await makeCachedRequestForCcxt(
          exchange,
          symbol,
          time_range,
          undefined,
          200
        );
      } else {
        result = await fetchOHLCV(exchange, symbol, time_range, undefined, 200);
      }

      if (result !== false) {
        res.json(result);
      } else {
        res.status(500).json({ success: false, error: "something goes wrong" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
