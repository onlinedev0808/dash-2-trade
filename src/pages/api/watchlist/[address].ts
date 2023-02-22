import nextConnect from "next-connect";
import { v4 as uuidv4 } from "uuid";
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
  Tokens: (number | string)[];
}

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { address } = req.query;
      const { name, id, tokenId } = req.body;

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
      if (!id) {
        const tokens = [];
        if (tokenId) {
          tokens.push(tokenId);
        }
        // add new watchlist
        watchlists.push({ name, id: uuidv4(), Tokens: tokens });

        const response1 = await DAO.UserDAO.updateWatchlists(
          JSON.stringify(watchlists),
          user.id
        );
        if (response1.status == false)
          return res
            .status(403)
            .json({ success: false, error: "Update watchlist failure" });
      } else {
        // rename watchlist
        const watchlist = watchlists.filter((wl) => wl.id === id)[0];
        watchlist.name = name;
        const response1 = await DAO.UserDAO.updateWatchlists(
          JSON.stringify(watchlists),
          user.id
        );
        if (response1.status == false)
          return res
            .status(403)
            .json({ success: false, error: "Update watchlist failure" });
      }

      const response_data1 = await DAO.UserDAO.getUserDatabyId(user.id);
      if (!response_data1.status == false)
        return res
          .status(403)
          .json({ success: false, error: "Can't get user data" });
      const [users] = response_data.data;
      const [updatedUser] = users;

      return res.json({ success: true, watchlists: updatedUser?.watchlists });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { address } = req.query;

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

      const watchlists = user.watchlists;

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
      const { address } = req.query;
      const { id } = req.body;

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

      let watchlists: ISavedWatchlist[] = user.watchlists;
      watchlists = watchlists.filter((watchlist) => watchlist.id !== id);

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
