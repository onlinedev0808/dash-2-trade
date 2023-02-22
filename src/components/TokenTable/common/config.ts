export enum TokenCols {
  Watchlist = "watchlist",
  Name = "name",
  Price = "price",
  History = "history",
  MarketCap = "marketCap",
  Volume = "volume",
  SFollowing = "socialFollowing",
  SInteractions = "socialInteractions",
  CirculatingSupply = "circulatingSupply",
  HistoryGraph = "historyGraph",
  ExtraMenu = "menu",
}

export const tokenTableColumnsConfig = [
  {
    Header: "Watchlist",
    id: TokenCols.Watchlist,
    accessor: TokenCols.Watchlist,
    width: 50,
    minWidth: 50,
  },
  {
    Header: "Token",
    id: TokenCols.Name,
    accessor: TokenCols.Name,
    width: 170,
    minWidth: 170,
  },
  {
    Header: "Price",
    id: TokenCols.Price,
    accessor: TokenCols.Price,
    minWidth: 96,
  },
  {
    Header: "History",
    id: TokenCols.History,
    accessor: TokenCols.History,
    minWidth: 88,
  },
  {
    Header: "Market Cap",
    id: TokenCols.MarketCap,
    accessor: TokenCols.MarketCap,
    minWidth: 110,
  },
  {
    Header: "Volume",
    id: TokenCols.Volume,
    accessor: TokenCols.Volume,
    // maxWidth: 200,
    minWidth: 133,
    // width: 200,
  },
  {
    Header: "Social Following",
    id: TokenCols.SFollowing,
    accessor: TokenCols.SFollowing,
    minWidth: 80,
  },
  {
    Header: "(7D) Social Interactions",
    id: TokenCols.SInteractions,
    accessor: TokenCols.SInteractions,
    minWidth: 95,
  },

  {
    Header: "Circulating Supply",
    id: TokenCols.CirculatingSupply,
    accessor: TokenCols.CirculatingSupply,
    minWidth: 166,
    // maxWidth: 150,
  },
  {
    Header: "History Graph",
    id: TokenCols.HistoryGraph,
    accessor: TokenCols.HistoryGraph,
    minWidth: 100,
  },

  {
    Header: "Menu",
    id: TokenCols.ExtraMenu,
    accessor: TokenCols.ExtraMenu,
    width: 50,
    minWidth: 50,
  },
];
