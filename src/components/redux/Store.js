import { configureStore } from "@reduxjs/toolkit";
import UserInfo from "./UserInfo";
import categoryValue from "./categoryValue";
import SelectedMovie from "./SelectedMovie";
import searchName from "./searchName";
import loadingURL from "./loadingURL";
import pageValue from "./pageValue";

const store = configureStore({
  reducer: {
    userInfo: UserInfo,
    categoryValue: categoryValue,
    SelectedMovie: SelectedMovie,
    searchName: searchName,
    loadingURL: loadingURL,
    pageValue: pageValue,
  },
});

export default store;
