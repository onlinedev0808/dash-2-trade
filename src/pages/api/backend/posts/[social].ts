import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { applyAuthMiddleware } from "../../../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../../../utils/rate-limit";
import { sessionOptions } from "../../../../lib/session";
import SERVER_BASE_URL from "../../../../constant/backend";
import makeCachedRequest from "../../../../lib/cacherequest";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { social, tokenId, limit } = req.query;
      let url = `${SERVER_BASE_URL}/crypto/${social}-posts?cc_id=${tokenId}`;

      if (limit != null) {
        url += `&limit=${limit}`;
      }

      const response = await makeCachedRequest(
        14,
        url,
        req.session.user?.caching
      );

      if (response.success) {
        res.json(response.data);
      } else {
        res.status(500).json(response);
      }

      /*const { data } = await axios.get(url);

      res.json(data);*/
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
