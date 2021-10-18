import { configureStore } from "@reduxjs/toolkit";
import UserInfo from "./UserInfo";
import categoryValue from "./categoryValue";
import SelectedMovie from "./SelectedMovie";

const store = configureStore({
  reducer: {
    userInfo: UserInfo,
    categoryValue: categoryValue,
    SelectedMovie: SelectedMovie,
  },
});

export default store;
