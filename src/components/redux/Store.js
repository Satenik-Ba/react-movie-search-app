import { configureStore } from "@reduxjs/toolkit";
import UserInfo from "./UserInfo";
import categoryValue from "./categoryValue";
import searchName from "./searchName";
import loadingURL from "./loadingURL";
import pageValue from "./pageValue";
import FavoriteMovie from "./FavoriteMovie";
import movieOrTV from "./movieOrTV";

const store = configureStore({
  reducer: {
    userInfo: UserInfo,
    categoryValue: categoryValue,
    FavoriteMovie: FavoriteMovie,
    searchName: searchName,
    loadingURL: loadingURL,
    pageValue: pageValue,
    movieOrTV: movieOrTV,
  },
});

export default store;
