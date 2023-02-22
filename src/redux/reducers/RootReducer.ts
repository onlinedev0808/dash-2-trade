import { combineReducers } from "@reduxjs/toolkit";
import WalletReducer from "./WalletSlice";
import TokenReducer from "./TokenSlice";
import PresaleTokenReducer from "./PresaleTokenSlice";
import ChainReducer from "./ChainSlice";
import UserReducer from "./UserSlice";
import BreadcrumbsReducer from "./BreadcrumbsSlice";
import exchangeSliceReducer from "./ExchangeSlice";

const RootReducer = combineReducers({
  presaleToken: PresaleTokenReducer,
  token: TokenReducer,
  wallet: WalletReducer,
  chain: ChainReducer,
  user: UserReducer,
  breadcrumbs: BreadcrumbsReducer,
  exchanges: exchangeSliceReducer,
});

export default RootReducer;
