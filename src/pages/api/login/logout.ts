import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/session";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";

const handler = nextConnect();

handler
  .use(applyRateLimitMiddleware)
  .post((req: NextApiRequest, res: NextApiResponse) => {
    req.session.destroy();
    res.json({ ok: true });
  });

export default withIronSessionApiRoute(handler, sessionOptions);
