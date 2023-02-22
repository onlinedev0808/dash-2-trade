import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import makeCachedRequest from "../../../../../lib/cacherequest";
import { sessionOptions } from "../../../../../lib/session";
import { applyRateLimitMiddleware } from "../../../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../../../lib/middlewares/auth";
import SERVER_BASE_URL from "../../../../../constant/backend";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    // try {
    const { token_id, time_period } = req.query;
    let url = `${SERVER_BASE_URL}/crypto/historical/quotes?time_period=${time_period}`;

    if (typeof token_id === "string") {
      token_id.split(",").forEach((id) => {
        url += `&id=${id}`;
      });
    }

    const response = await makeCachedRequest(
      10,
      url,
      req.session.user?.caching
    );
    // const response = await axios.get(endpoint);
    //
    // let token = "";
    //
    // if (Array.isArray(token_id)) {
    //   token = token_id[0];
    // } else token = token_id;
    // const tokenData = response.data[token];
    //
    // if (!tokenData) return [];
    //
    // const result = tokenData.map((stamp) => [
    //   stamp.timestamp * 1000,
    //   stamp.price,
    // ]);
    res.json(response.data);
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({ success: false, error });
    // }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
