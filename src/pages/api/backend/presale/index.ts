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
    try {
      const {
        sort,
        desc,
        limit,
        offset,
        kyc,
        audit,
        vc,
        search,
        chain,
        status,
      } = req.query;

      let url = `${SERVER_BASE_URL}/presales?sort=${sort}&desc=${desc}&limit=${limit}&offset=${offset}`;

      if (typeof status !== "undefined") {
        url += `&status=${status}`;
      }

      if (typeof kyc !== "undefined") {
        url += `&kyc=${kyc}`;
      }

      if (typeof audit !== "undefined") {
        url += `&audit=${audit}`;
      }

      if (typeof vc !== "undefined") {
        url += `&vc_backed=${vc}`;
      }

      if (typeof chain !== "undefined") {
        url += `&chain=${chain}`;
      }

      if (typeof search !== "undefined") {
        url += `&name_symbol=${search}`;
      }

      const response = await makeCachedRequest(
        6,
        url,
        req.session.user?.caching
      );
      res.json(response.data || []);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
