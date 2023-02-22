import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../lib/session";
import { applyAuthMiddleware } from "../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../utils/rate-limit";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { caching } = await req.body;
    req.session.user.caching = caching;
    await req.session.save();
    return res.status(200).send("");
  });

export default withIronSessionApiRoute(handler, sessionOptions);
