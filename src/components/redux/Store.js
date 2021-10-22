import { configureStore } from "@reduxjs/toolkit";
import UserInfo from "./UserInfo";
import categoryValue from "./categoryValue";
import SelectedMovie from "./SelectedMovie";
import searchName from "./searchName";
import loadingURL from "./loadingURL";

const store = configureStore({
  reducer: {
    userInfo: UserInfo,
    categoryValue: categoryValue,
    SelectedMovie: SelectedMovie,
    searchName: searchName,
    loadingURL: loadingURL,
  },
});

export default store;
