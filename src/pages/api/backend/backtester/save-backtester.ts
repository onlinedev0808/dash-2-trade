import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { applyRateLimitMiddleware } from "../../../../utils/rate-limit";
import { applyAuthMiddleware } from "../../../../lib/middlewares/auth";
import { sessionOptions } from "../../../../lib/session";

const handler = nextConnect();

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { body } = req;
      const target = {
        token: body.token,
        timeframe: body.resolution,
      };

      const strategy = {
        "set-1": {
          asset: "BTC",
          timeframe: "1H",
          indicators: [
            {
              indicator: "EMA",
              target_input1: "close",
              periods: 21,
            },
            {
              indicator: "RSI",
              target_input1: "close",
              periods: 21,
            },
          ],
          long: {
            open: {
              "set-1": [
                [
                  "Indicator <-> Indicator",
                  ["close", "greater than", "EMA(close,21)"],
                ],
                ["Indicator <-> Number", ["RSI(close,21)", "lesser than", 65]],
              ],
            },
            close: {
              "set-1": [
                [
                  "Indicator <-> Indicator",
                  ["close", "lesser than", "EMA(close,21)"],
                ],
              ],
            },
          },
          short: {
            open: {
              "set-1": [
                [
                  "Indicator <-> Indicator",
                  ["close", "lesser than", "EMA(close,21)"],
                ],
                ["Indicator <-> Number", ["RSI(close,21)", "greater than", 35]],
              ],
            },
            close: {
              "set-1": [
                [
                  "Indicator <-> Indicator",
                  ["close", "greater than", "EMA(close,21)"],
                ],
              ],
            },
          },
        },
        "set-2": {
          asset: "ETH",
          timeframe: "1H",
          indicators: [
            {
              indicator: "RSI",
              target_input1: "close",
              periods: 21,
            },
            {
              indicator: "EMA",
              target_input1: "close",
              periods: 21,
            },
          ],
          long: {
            open: {
              "set-1": [
                ["Indicator <-> Number", ["RSI(close,21)", "lesser than", 65]],
                [
                  "Indicator <-> Indicator",
                  ["close", "greater than", "EMA(close,21)"],
                ],
              ],
            },
            close: {},
          },
          short: {
            open: {
              "set-1": [
                ["Indicator <-> Number", ["RSI(close,21)", "greater than", 35]],
                [
                  "Indicator <-> Indicator",
                  ["EMA(close,21)", "lesser than", "EMA(close,21)"],
                ],
              ],
            },
            close: {},
          },
        },
      };

      const settings = {
        d_limit: "None",
        w_limit: "None",
        d_obj: "None",
        w_obj: "None",
        max_size: 5000,
        leverage_multiplier: 1,
        tp_param: [body.settings[0].takeProfit],
        sl_param: [body.settings[0].stopLoss],
        oa_param: [],
        fc_param: [],
        signal_settings: {
          open_type: 0,
          signal_cancel: 1,
        },
        position_sizing: {
          sizing_type: 1,
          margin_cash: 1,
          start_cash: body.settings[0].startCash,
          min_possible_size: 1,
          margin_factor: 1.0,
        },
        pnl_multiplier: 1,
      };

      // const response = await axios.post("", {
      // target, strategy, settings
      // });
      res.json({ body: { target, strategy, settings } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
