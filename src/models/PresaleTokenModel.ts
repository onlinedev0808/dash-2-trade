interface PresaleTokenModel {
  id: number;
  score: number;
  name: string;
  symbol: string;
  adress: string;
  title: string;
  listing_on: string;
  suply_for_presale: number;
  suply_for_liqudity: number;
  softcap: number;
  hardcap: number;
  cap_currency: string;
  total_contributors: string;
  status: string;
  source: string;
  logo: string;
  description: string;
  presale_start: string;
  presale_stop: string;
  included_on_dashboard: boolean;
}

export default PresaleTokenModel;
