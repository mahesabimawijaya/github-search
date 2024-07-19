import { combineReducers } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  search: persistReducer(persistConfig, searchReducer),
});

export default rootReducer;
