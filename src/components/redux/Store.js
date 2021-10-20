import { configureStore } from "@reduxjs/toolkit";
import UserInfo from "./UserInfo";
import categoryValue from "./categoryValue";
import SelectedMovie from "./SelectedMovie";
import searchName from "./searchName";
import movie_or_TV_show from "./movie_or_TV_show";

const store = configureStore({
  reducer: {
    userInfo: UserInfo,
    categoryValue: categoryValue,
    SelectedMovie: SelectedMovie,
    searchName: searchName,
    movie_or_TV_show: movie_or_TV_show,
  },
});

export default store;
