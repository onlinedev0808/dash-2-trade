import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { withIronSessionApiRoute } from "iron-session/next";
// import Dao from "../../../services/db/Dao";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";

import { sessionOptions } from "../../../lib/session";
import SERVER_BASE_URL from "../../../constant/backend";
import { DAO } from "../../../lib/dao";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

interface ISavedWatchlist {
  name: string;
  id: string;
  Tokens: [];
}

interface IWatchlistToken {
  id: number | string;
  social_volume?: number;
  name: string;
  supply_for_liquidity?: number;
  presale_market_cap_usd?: number;
  symbol: string;
  rank?: number;
  stats?: {
    volume?: number;
    market_cap?: number;
    price_range?: number[];
    price_change?: number;
    prev_price?: number;
    curr_price?: number;
  };
  logo: string | null;
}

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { params } = req.query;
      if (!params)
        return res.status(400).json({ success: false, msg: "Bad request" });

      let address = "";
      let id = "";

      let type = "";

      if (Array.isArray(params)) {
        address = params[0];
        id = params[1];
        type = params[2];
      }

      const response_data = await DAO.UserDAO.getUserDatabyEmail(address);
      if (!response_data.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get user data" });
      const [accounts] = response_data.data;
      if (!accounts.length) {
        return res.status(404).json({ success: false, msg: "user not found" });
      }

      const [user] = accounts;

      const watchlists: ISavedWatchlist[] = user.watchlists;
      const watchlist = watchlists.find((wl) => wl.id === id);

      const tokens: (string | number)[] = watchlist.Tokens;
      if (!tokens.length) {
        return res.json([]);
      }

      if (type === "Tokens") {
        const tokenQuery = tokens.reduce(
          (previousValue, currentValue) =>
            previousValue + "id=" + currentValue + "&",
          ""
        );

        const { data }: { data: IWatchlistToken[] } = await axios.get(
          `${SERVER_BASE_URL}/crypto?${tokenQuery}limit=20&sort=id&order=asc`
        );

        return res.json(
          data.map((item, index: number) => ({
            id: index + 1,
            tokenId: item.id,
            symbol: item?.symbol,
            name: item?.name,
            rank: item?.rank || null,
            tokenImg: item?.logo,
            volume: item?.stats?.volume || null,
            marketCap: item?.stats?.market_cap || null,
            priceMin: item?.stats?.price_range[0] || null,
            priceMax: item?.stats?.price_range[1] || null,
            priceChange: item?.stats?.price_change || null,
            priceCurrent: item?.stats?.curr_price || null,
            price: item?.stats?.curr_price || null,
            liquidity: item?.supply_for_liquidity || 0,
            dex: "",
          }))
        );
      }

      const { data: presaleTokenData }: { data: IWatchlistToken[] } =
        await axios.get(
          `${SERVER_BASE_URL}/presales?sort=score&desc=true&limit=20`
        );

      const presaleTokens = presaleTokenData.filter((item) =>
        tokens.includes(item.id)
      );

      const data: IWatchlistToken[] = [...presaleTokens];

      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
