import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { removeCookies, deleteCookie } from "cookies-next";
import { sessionOptions } from "../../lib/session";
import { applyAuthMiddleware } from "../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../utils/rate-limit";

const handler = nextConnect();

handler
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { cookies } = await req.body;

    const deletedCookies = [];

    // DELETING Cookies
    Object.keys(req.cookies).forEach((key) => {
      if (!cookies.includes(key)) {
        deletedCookies.push(key);
        deleteCookie(key, { req, res });
      }
    });

    return res.status(200).send({ cookies: deletedCookies });
  });

export default withIronSessionApiRoute(handler, sessionOptions);
