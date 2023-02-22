interface NewListingsModel {
  id: number;
  token: {
    id: number;
    symbol: string;
    name: string;
    description: string;
    logo: string;
  };
  date_listed: string;
  market_cap: number;
}

export default NewListingsModel;
