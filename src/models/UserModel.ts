interface UserModel {
  email: string;
  id: string;
  caching: boolean;
  mfa: boolean;
  watchlists: Array<Watchlist>;
  subscriptionTier: number;
  firstName: string;
  lastName: string;
  nickname: string;
  profileImage: string;
}
export interface Watchlist {
  id: string;
  name: string;
  tokens: Array<string>;
}
export default UserModel;
