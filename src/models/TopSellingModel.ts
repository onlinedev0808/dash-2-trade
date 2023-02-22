interface TopSellingModel {
  id: number;
  token: {
    id: number;
    symbol: string;
    name: string;
    logo: string;
  };
  presale_start: string;
  amount_raised: number;
}

export default TopSellingModel;
