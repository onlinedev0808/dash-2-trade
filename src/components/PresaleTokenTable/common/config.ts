export enum PresalesCols {
  Watchlist = "watchlist",
  Name = "name",
  Score = "score",
  End = "presale_stop",
  Tags = "tags",
  Raised = "amount_raised",
  HardCap = "hardcap",
  MarketCap = "presale_market_cap_usd",
  SFollowing = "social_following",
  SInteractions = "social_mentions",
  Chain = "chain",
}

export const presaleTableColumnsConfig = [
  {
    Header: "Watchlist",
    id: PresalesCols.Watchlist,
    accessor: PresalesCols.Watchlist,
    minWidth: 40,
    // maxWidth: 40,
    width: 40,
  },
  {
    Header: "Token",
    id: PresalesCols.Name,
    accessor: PresalesCols.Name,
    minWidth: 200,
    // width: 200,
    // width: 150,
  },
  {
    Header: "Dash Score",
    id: PresalesCols.Score,
    accessor: PresalesCols.Score,
    minWidth: 80,
    //  maxWidth: 150,
  },
  {
    Header: "End Date",
    id: PresalesCols.End,
    accessor: PresalesCols.End,
    minWidth: 130,
    // width: 130,
  },
  {
    Header: "Tags",
    id: PresalesCols.Tags,
    accessor: PresalesCols.Tags,
    minWidth: 110,
    // width: 110,
  },
  {
    Header: "Amount Raised",
    id: PresalesCols.Raised,
    accessor: PresalesCols.Raised,
    // maxWidth: 200,
    minWidth: 80,
    // width: 80,
  },
  {
    Header: "Hard Cap",
    id: PresalesCols.HardCap,
    accessor: PresalesCols.HardCap,
    minWidth: 64,
    // width: 64,
  },
  {
    Header: "Presale Marketcap",
    id: PresalesCols.MarketCap,
    accessor: PresalesCols.MarketCap,
    minWidth: 90,
    // width: 90,
  },
  {
    Header: "Social Following",
    id: PresalesCols.SFollowing,
    accessor: PresalesCols.SFollowing,
    minWidth: 90,
    // width: 90,
  },
  {
    Header: "(7D) Social Interactions",
    id: PresalesCols.SInteractions,
    accessor: PresalesCols.SInteractions,
    minWidth: 90,
    // width: 90,
  },

  {
    Header: "Chain",
    id: PresalesCols.Chain,
    accessor: PresalesCols.Chain,
    minWidth: 60,
    width: 60,
    // maxWidth: 150,
  },
];
