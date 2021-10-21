import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  pagTvShows: 1,
};

const pageTvShows = createSlice({
  name: "pageTvShows",
  initialState,
  reducers: {
    changeValue(state, action) {
      state.pagTvShows = action.payload;
    },
  },
});

export const PagTvShowsAction = pageTvShows.actions;
export default pageTvShows.reducer;
