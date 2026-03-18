import { combineReducers } from "@reduxjs/toolkit";

import vipReducer from "../rtk/features/vipSlice";
import authReducer from "../rtk/features/authSlice";

export const rootReducer = combineReducers({
  vip: vipReducer,
  auth: authReducer,
});
