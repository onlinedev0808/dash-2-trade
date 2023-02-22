import { withIronSessionApiRoute } from "iron-session/next";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import getConfig from "next/config";
import nextConnect from "next-connect";
import makeCachedRequest from "../../../lib/cacherequest";
import { sessionOptions } from "../../../lib/session";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { serverRuntimeConfig } = getConfig();
      const CRYPTO_PANIC_API_KEY = serverRuntimeConfig.cryptoPanic.apiKey;

      const { kind: selectedKind, keyword, region } = req.query;

      let kind = "";
      if (typeof selectedKind === "string") {
        kind = selectedKind.toLowerCase();
      }

      if (!selectedKind) {
        kind = "news";
      }

      let reqUrl = `https://cryptopanic.com/api/v1/posts/?auth_token=${CRYPTO_PANIC_API_KEY}&kind=${kind}`;
      if (keyword !== "crypto") {
        reqUrl += `&currencies=${keyword}`;
      }

      if (region) {
        reqUrl += `&regions=${region}`;
      }

      reqUrl += `&metadata=true`;

      // const response = await axios.get(reqUrl);
      const response = await makeCachedRequest(
        12,
        reqUrl,
        req.session.user?.caching
      );
      res.json({ results: response.data.results });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
