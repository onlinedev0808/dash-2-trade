import { withIronSessionApiRoute } from "iron-session/next";
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../../lib/session";
import { CONTENTFUL_DAO } from "../../../lib/contentful";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    const content = await CONTENTFUL_DAO.Faq.getFAQContent();
    res.status(200).json(content);
  });

export default withIronSessionApiRoute(handler, sessionOptions);
