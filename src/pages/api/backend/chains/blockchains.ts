import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import makeCachedRequest from "../../../../lib/cacherequest";
import { sessionOptions } from "../../../../lib/session";
import { applyRateLimitMiddleware } from "../../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../../lib/middlewares/auth";

axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const response = await makeCachedRequest(
        3,
        `https://d2t.info/dex/blockchains`,
        req.session.user?.caching
      );
      // const total = JSON.parse(response.data.replace(/\bNaN\b/g, 'null'));
      res.json(response.data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });
export default withIronSessionApiRoute(handler, sessionOptions);
