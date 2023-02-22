/* eslint-disable no-restricted-syntax */
import nextConnect from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
import ccxt from "ccxt";
import { withIronSessionApiRoute } from "iron-session/next";
import { applyAuthMiddleware } from "../../../../lib/middlewares/auth";
import { applyRateLimitMiddleware } from "../../../../utils/rate-limit";

import { sessionOptions } from "../../../../lib/session";
// import { makeCachedRequestForCcxt } from "../../../../lib/cacherequest";

const handler = nextConnect();

const exchangeList = [
  "binance",
  "binancecoinm",
  "binanceusdm",
  "bitget",
  "bitmart",
  "bitvavo",
  "bybit",
  "gate",
  "gateio",
  "idex",
  "mexc",
  "mexc3",
  "okx",
  "wavesexchange",
  "aax",
  "alpaca",
  "ascendex",
  "bequant",
  "bibox",
  "bigone",
  "binanceus",
  "bit2c",
  "bitbank",
  "bitbay",
  "bitbns",
  "bitcoincom",
  "bitfinex",
  "bitfinex2",
  "bitflyer",
  "bitforex",
  "bithumb",
  "bitmex",
  "bitopro",
  "bitpanda",
  "bitrue",
  "bitso",
  "bitstamp",
  "bitstamp1",
  "bittrex",
  "bkex",
  "bl3p",
  "blockchaincom",
  "btcalpha",
  "btcbox",
  "btcex",
  "btcmarkets",
  "btctradeua",
  "btcturk",
  "bw",
  "bytetrade",
  "cex",
  "coinbase",
  "coinbaseprime",
  "coinbasepro",
  "coincheck",
  "coinex",
  "coinfalcon",
  "coinmate",
  "coinone",
  "coinspot",
  "crex24",
  "cryptocom",
  "currencycom",
  "delta",
  "deribit",
  "digifinex",
  "eqonex",
  "exmo",
  "flowbtc",
  "fmfwio",
  "ftx",
  "ftxus",
  "gemini",
  "hitbtc",
  "hitbtc3",
  "hollaex",
  "huobi",
  "huobijp",
  "huobipro",
  "independentreserve",
  "indodax",
  "itbit",
  "kraken",
  "kucoin",
  "kucoinfutures",
  "kuna",
  "latoken",
  "lbank",
  "lbank2",
  "liquid",
  "luno",
  "lykke",
  "mercado",
  "ndax",
  "novadax",
  "oceanex",
  "okcoin",
  "okex",
  "okex5",
  "paymium",
  "phemex",
  "poloniex",
  "probit",
  "qtrade",
  "ripio",
  "stex",
  "therock",
  "tidebit",
  "tidex",
  "timex",
  "tokocrypto",
  "upbit",
  "wazirx",
  "whitebit",
  "woo",
  "yobit",
  "zaif",
  "zb",
  "zipmex",
  "zonda",
];

const exchangeInfo = async (exchange, symbol) => {
  //const testSymbol = "ETH"; // 'ETH';
  // console.log('exchange', exchange);
  try {
    const exchangeEntity = new ccxt[exchange]();

    if (exchangeEntity.has.fetchOHLCV) {
      await exchangeEntity.loadMarkets();
      const currencies = Object.keys(exchangeEntity.currencies);

      if (currencies.includes(symbol)) {
        const markets = Object.keys(exchangeEntity.markets);

        const availableMarkets = markets.filter((item) =>
          item.includes(`${symbol}/`)
        );

        if (availableMarkets.length === 0)
          return {
            success: false,
            error: `${exchange} does not have info about ${symbol} markets`,
          };

        const timeframes = exchangeEntity.timeframes ?? {
          "1m": "1m",
          "3m": "3m",
          "5m": "5m",
          "15m": "15m",
          "30m": "30m",
          "1h": "1h",
          "4h": "4h",
          "1d": "1d",
          "1w": "1w",
          "1M": "1mo",
        };

        const timeRange = Object.entries(timeframes)[0][1];
        const sinceTimestamp = exchangeEntity.milliseconds() - 60 * 60 * 1000;

        const selectedMarket = availableMarkets[0];
        const result = await exchangeEntity.fetchOHLCV(
          selectedMarket,
          timeRange,
          sinceTimestamp,
          1
        );
        //This is for cacherequet in future
        // const result = await makeCachedRequestForCcxt(
        //   exchange,
        //   selectedMarket,
        //   timeRange,
        //   sinceTimestamp,
        //   1
        // );
        availableMarkets.push(symbol); // for testing purpose
        if (result.success) {
          return {
            success: true,
            data: result.data,
            timeframes,
            availableMarkets,
            selectedMarket,
          };
        }
      }
      return {
        success: false,
        error: `${exchange} does not have info about ${symbol}`,
      };
    }
    return { success: false, error: `${exchange} does not have fetchOHLCV` };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unexpected error" };
  }
};

const findExchange = async (symbol) => {
  for (const exchangeItem of exchangeList) {
    // const tets = await exchangeInfo(exchangeItem);
    // eslint-disable-next-line no-await-in-loop
    const result = await exchangeInfo(exchangeItem, symbol);
    if (result.success) return { exchange: exchangeItem, result };
  }

  return false;
};

handler
  .use(applyAuthMiddleware)
  .use(applyRateLimitMiddleware)
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { symbol } = req.query;
      const exchangeResponse = await findExchange(symbol);

      if (!exchangeResponse) {
        res
          .status(500)
          .json({ success: false, error: "exchange can not be found" });
      } else {
        const { timeframes, availableMarkets, selectedMarket } =
          exchangeResponse.result;
        res.json({
          exchange: exchangeResponse.exchange,
          timeframes,
          availableMarkets,
          selectedMarket,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, error });
    }
  });

export default withIronSessionApiRoute(handler, sessionOptions);
