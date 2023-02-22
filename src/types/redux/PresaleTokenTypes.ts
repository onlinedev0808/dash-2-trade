export interface IPresaleTokenDistribution {
  g: string;
  d: number | string;
  c?: number | string;
  v?: number | string;
}

export interface ITokenSocial {
  linkedin?: string;
  telegram?: string;
  twitter?: string;
  medium?: string;
  discord?: string;
  youtube?: string;
  github?: string;
}

export interface ITokenSocialNumber {
  linkedin?: { count: number; change: number };
  telegram?: { count: number; change: number };
  twitter?: { count: number; change: number };
  medium?: { count: number; change: number };
  discord?: { count: number; change: number };
  youtube?: { count: number; change: number };
  github?: { count: number; change: number };
}

// export interface IPresaleTokenOld {
//   onchain_contract_link: string;
//   developer_activity: number;
//   developer_activity_change: number;
//   social_volume: number;
//   social_volume_change: number;
//   sentiment_trend: string;
//   sentiment: string;
//   amount_sold_usd: number;
//   chain: string;
//   hardcap_usd: string;
//   softcap_usd: string;
//   cap_logo: string;
//   address: string;
//   cap_currency: string;
//   description: string;
//   hardcap: number;
//   id: number;
//   listing_on: string;
//   logo: string;
//   name: string;
//   presale_start: string;
//   presale_stop: string;
//   score_dev: number;
//   score_marketing: number;
//   score_product: number;
//   score_team: number;
//   score_tokenomics: number;
//   softcap: number;
//   source: string;
//   status: string;
//   supply_for_liquidity: number;
//   supply_for_presale: number;
//   symbol: string;
//   title: string;
//   token_adress: string;
//   total_supply: string;
//   suply_for_presale: string;
//   suply_for_liqudity: string;
//   socials?: ITokenSocialNumber;
//   kyc: boolean | null;
//   kyc_source: string | null;
//   audit: boolean | null;
//   audit_source: string | null;
//   vc_backed: boolean | null;
//   vc_backed_source: string | null;
//   token_distribution?: IPresaleTokenDistribution[];
//   //
//   amount_raised?: number;
//   token: {
//     id: number;
//     symbol: string;
//     name: string;
//     description?: string;
//     logo: string;
//     platform: {
//       chain: {
//         id: number;
//         symbol: string;
//         slug: string;
//         name: string;
//       };
//       address: string;
//     };
//     urls?: ITokenSocial;
//   };
//   score: {
//     total: number;
//     team: number;
//     product: number;
//     marketing: number;
//     dev: number;
//     tokenomics: number;
//   };
// }

export interface IPresaleToken {
  id: number;
  token: {
    id: number;
    symbol: string;
    name: string;
    description?: string;
    logo: string;
    social_metrics: {
      followers: {
        count: number;
        change: number;
      };
      mentions: {
        count: number;
        change: number;
      };
    };
    urls: {
      medium: string;
      twitter: string;
      linkedin: string;
    };
    chains: [
      {
        id: number;
        symbol: string;
        name: string;
        logo: string;
        token_address: string;
        contract_link: string;
      }
    ];
  };
  score: {
    total: number;
    team: number;
    product: number;
    marketing: number;
    dev: number;
    tokenomics: number;
  };
  cap_logo: string | null;
  cap_currency: string | null;
  presale_start: string | null;
  presale_stop: string | null;
  cancelled: boolean;
  softcap: number | null;
  hardcap: number | null;
  supplied_in: number | null;
  presale_market_cap_usd: number | null;
  kyc: boolean;
  kyc_source: string | null;
  audit: boolean;
  audit_source: string | null;
  amount_raised: number;
  vc_backed: boolean;
  vc_backed_source: string | null;
  team_doxxed: boolean;
  vesting: boolean;
  listing_on: string | null;
  supply_for_presale: number | null;
  supply_for_liquidity: number | null;
  total_contributors: number | null;
  total_supply: number | null;
  type_of_sales: string;
  token_distribution: IPresaleTokenDistribution[];
}

export interface ITopSocialActivity {
  token: {
    id: number;
    name: string;
    symbol: string;
    logo: string;
  };
  presale_id?: number;
  metric: string;
  value: {
    count: number;
    change: number;
  };
}
