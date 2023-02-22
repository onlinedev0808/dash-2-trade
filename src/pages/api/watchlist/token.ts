import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
// import Dao from "../../../services/db/Dao";
import { applyAuthMiddleware } from "../../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../../utils/rate-limit";
import { sessionOptions } from "../../../lib/session";
import { DAO } from "../../../lib/dao";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mysql = require("mysql2");

const handler = nextConnect();

interface ISavedWatchlist {
  name: string;
  id: string;
  Tokens: any;
}

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { token, id, address } = req.body;

      const response_data = await DAO.UserDAO.getUserDatabyEmail(address);
      if (!response_data.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get user data" });
      const [accounts] = response_data.data;

      if (!accounts.length) {
        // connection.end();
        return res.status(404).json({ success: false, msg: "user not found" });
      }

      const [user] = accounts;

      const watchlists: ISavedWatchlist[] = user.watchlists;
      const watchlist = watchlists.filter((wl) => wl.id === id)[0];

      if (watchlist.Tokens.includes(token)) {
        return res.json({ success: false });
      }

      watchlist.Tokens.push(token);

      const response1 = await DAO.UserDAO.updateWatchlists(
        JSON.stringify(watchlists),
        user.id
      );
      if (response1.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Update watchlist failure" });

      return res.json({ success: true, watchlists });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { tokens, id, address } = req.body;

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
      const watchlist = watchlists.filter((wl) => wl.id === id)[0];
      watchlist.Tokens = watchlist.Tokens.filter((t) => !tokens.includes(t));

      const response1 = await DAO.UserDAO.updateWatchlists(
        JSON.stringify(watchlists),
        user.id
      );
      if (response1.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Update watchlist failure" });

      return res.json({ success: true, watchlists });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
