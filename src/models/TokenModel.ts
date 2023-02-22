interface TokenModel {
  id: number;
  symbol: string;
  slug: string;
  name: string;
  rank: number;
  logo: string;
  platform?: {
    chain: {
      id: number;
      symbol: string;
      slug: string;
      name: string;
    };
    address: string;
  };
}

export default TokenModel;
