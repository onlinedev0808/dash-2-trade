import axios from "axios";
import { TokenCols } from "./config";

const fetchTokensSocials = async (tokenId: number) => {
  const response = await axios.get(
    `/api/backend/tokens/${tokenId}/social-metrics`
  );

  return { [tokenId]: response.data };
};

const fetchTokensPrices = async (
  tokensIds: number | number[],
  period = "1d"
) => {
  const ids = Array.isArray(tokensIds) ? tokensIds.join() : tokensIds;

  const response = await axios.get(
    `/api/backend/tokens/historical?token_id=${ids}&time_period=${period}`
  );
  return response.data;
};

const fetchTokensVolumes = async (
  tokensIds: number | number[],
  period = "1d"
) => {
  const ids = Array.isArray(tokensIds) ? tokensIds.join() : tokensIds;

  const response = await axios.get(
    `/api/backend/tokens/historical/heatmap?token_id=${ids}&time_period=${period}`
  );

  return response.data;
};

export const getTokensPrices = async (responseData, pricesPeriod) => {
  const promisesPrices = [];
  const tokensIds = [];
  const args = [];

  for (let i = 0; i < responseData.length; i++) {
    const currentToken = responseData[i];
    const isLastToken = i === responseData.length - 1;

    tokensIds.push(currentToken.id);

    if (tokensIds.length >= 5 || isLastToken) {
      promisesPrices.push(fetchTokensPrices);
      args.push([...tokensIds]);
      tokensIds.length = 0;
    }
  }
  const prices = await Promise.all(
    promisesPrices.map((p, idx) => p(args[idx], pricesPeriod.value))
  );
  const mergedPrices = Object.assign({}, ...prices);
  return mergedPrices;
};

export const getTokensVolumes = async (responseData) => {
  const promisesVolumes = [];
  const tokensIds = [];
  const args = [];

  for (let i = 0; i < responseData.length; i++) {
    const currentToken = responseData[i];
    const isLastToken = i === responseData.length - 1;

    tokensIds.push(currentToken.id);

    if (tokensIds.length >= 5 || isLastToken) {
      promisesVolumes.push(fetchTokensVolumes);
      args.push([...tokensIds]);
      tokensIds.length = 0;
    }
  }
  const volumes = await Promise.all(
    promisesVolumes.map((p, idx) => p(args[idx]))
  );
  const mergedVolumes = Object.assign({}, ...volumes);
  return mergedVolumes;
};

export const getTokensSocials = async (responseData) => {
  const promisesSocials = [];
  const tokensIds = [];
  const args = [];

  for (let i = 0; i < responseData.length; i++) {
    const currentToken = responseData[i];
    const isLastToken = i === responseData.length - 1;

    tokensIds.push(currentToken.id);
    promisesSocials.push(fetchTokensSocials);

    if (tokensIds.length >= 5 || isLastToken) {
      args.push([...tokensIds]);
      tokensIds.length = 0;
    }
  }
  const mergedArgs = args.flat();
  const socials = await Promise.all(
    promisesSocials.map((p, idx) => p(mergedArgs[idx]))
  );
  const mergedSocials = Object.assign({}, ...socials);
  return mergedSocials;
};

// const getTokensPricesSocialsVolumes = async (responseData) => {
//   const promisesPrices = [];
//   const promisesVolumes = [];
//   const promisesSocials = [];
//   const tokensIds = [];
//   const args = [];
//
//   for (let i = 0; i < responseData.length; i++) {
//     const currentToken = responseData[i];
//     const isLastToken = i === responseData.length - 1;
//
//     tokensIds.push(currentToken.id);
//     promisesSocials.push(fetchTokensSocials);
//
//     if (tokensIds.length >= 5 || isLastToken) {
//       promisesPrices.push(fetchTokensPrices);
//       promisesVolumes.push(fetchTokensVolumes);
//       args.push([...tokensIds]);
//       tokensIds.length = 0;
//     }
//   }
//   // FIXME: make Promise.All independent
//   const prices = await Promise.all(
//     promisesPrices.map((p, idx) => p(args[idx], pricesPeriod.value))
//   );
//   const volumes = await Promise.all(
//     promisesVolumes.map((p, idx) => p(args[idx]))
//   );
//   const mergedArgs = args.flat();
//   const socials = await Promise.all(
//     promisesSocials.map((p, idx) => p(mergedArgs[idx]))
//   );
//   const mergedPrices = Object.assign({}, ...prices);
//   const mergedVolumes = Object.assign({}, ...volumes);
//   const mergedSocials = Object.assign({}, ...socials);
//   return { prices: mergedPrices, volumes:mergedVolumes, socials: mergedSocials };
// };

export const prepareTokenTableData = (
  data,
  prices = [],
  volumes = [],
  socials = [],
  watchlists = [],
  handleWatchlistClick?: (tokenId, watchlistId) => void
) => {
  const formattedData = data.map((t) => {
    const tVolumes = volumes?.[t.id]?.mon;
    const firstVol = tVolumes?.at(0).volume;
    const lastVol = tVolumes?.at(-1).volume;
    const tVolumeChange = (lastVol / firstVol) * 100 - 100;

    const tPrices = prices[t.id]?.map((record) => record?.price);
    const tSocialsFollowing = socials?.[t.id]?.followers?.total;
    const tSocialsEngagements = socials?.[t.id]?.engagements;

    return {
      id: t.id,
      [TokenCols.Watchlist]: { id: t.id, handleWatchlistClick, watchlists },
      [TokenCols.Name]: { logo: t.logo, name: t.name, symbol: t.symbol },
      [TokenCols.Price]: tPrices?.at(-1) ?? "-",
      [TokenCols.History]: tPrices ?? ["-"],
      [TokenCols.MarketCap]: 100500,
      [TokenCols.Volume]: {
        current: lastVol ?? 25502,
        currentUSD: lastVol ?? 1005001,
        symbol: t.symbol,
        change: tVolumeChange,
      },
      [TokenCols.SFollowing]: {
        followers: tSocialsFollowing?.count ?? 0,
        change: tSocialsFollowing?.change ?? 0,
      },
      // [TokenCols.SFollowing]: "86,78K",
      [TokenCols.SInteractions]: {
        interactions: tSocialsEngagements?.count,
        change: tSocialsEngagements?.change,
      },
      // [TokenCols.SInteractions]: 107,
      [TokenCols.CirculatingSupply]: {
        current: 19227762,
        max: 19227762 * 1.5,
        symbol: t.symbol,
      },
      [TokenCols.HistoryGraph]: tPrices ?? [0],
      // tPrices ?? DUMMY_TIMESTAMPS.map((record) => record.price),
    };
  });

  return formattedData;
};
