import { compareAsc } from "date-fns";
import { PresalesCols } from "./config";
import { TooltipPosY } from "../../common/Tooltip";
import { PLACEHOLDER } from "./tokenUtils";
import { formatNumber } from "../../../utils";

export const preparePresaleTableData = (
  data,
  watchlists = [],
  handleWatchlistClick?: (tokenId, watchlistId) => void
) => {
  const formattedData = data.map((dataItem, idx) => {
    const {
      id,
      score,
      presale_stop,
      kyc,
      audit,
      vc_backed: vcBacked,
      hardcap,
      cap_currency,
      presale_market_cap_usd,
      amount_raised: amountRaised,
      token: t,
      token_distribution: tokenDistribution,
    } = dataItem;

    const tooltipYPos = idx < 2 ? TooltipPosY.Bottom : null;
    const end = presale_stop
      ? new Date(presale_stop).toLocaleDateString()
      : null;
    const tFollowers = t?.social_metrics?.followers;
    const tMentions = t?.social_metrics?.mentions;
    return {
      id,
      [PresalesCols.Watchlist]: { id, handleWatchlistClick, watchlists },
      [PresalesCols.Name]: {
        logo: t.logo,
        name: t.name ?? PLACEHOLDER,
        symbol: t.symbol ?? PLACEHOLDER,
      },
      [PresalesCols.Score]: score?.total !== 0 ? score?.total : PLACEHOLDER,
      [PresalesCols.End]: {
        end,
        isActive: compareAsc(new Date(presale_stop), new Date()) !== -1,
        presaleStop: presale_stop,
        // left: daysSince(presale_stop),
      },
      [PresalesCols.Tags]: {
        audit,
        vcBacked,
        kyc,
        tokenDistribution,
        tooltipYPos,
      },
      [PresalesCols.Raised]: amountRaised
        ? `$ ${formatNumber(+amountRaised)}`
        : PLACEHOLDER,
      [PresalesCols.HardCap]: hardcap
        ? { cap: formatNumber(hardcap), currency: cap_currency }
        : { cap: PLACEHOLDER },
      [PresalesCols.MarketCap]: presale_market_cap_usd
        ? `$ ${formatNumber(+presale_market_cap_usd)}`
        : PLACEHOLDER,
      [PresalesCols.SFollowing]: {
        count: tFollowers?.count,
        change: tFollowers?.change,
      },
      [PresalesCols.SInteractions]: {
        count: tMentions?.count,
        change: tMentions?.change,
      },
      [PresalesCols.Chain]: { chain: t?.chains?.[0], tokenLogo: t?.logo },
    };
  });

  return formattedData;
};
