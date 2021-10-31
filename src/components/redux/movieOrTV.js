import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieOrTV: "movie",
};

const movieOrTV = createSlice({
  name: "movieOrTV",
  initialState,
  reducers: {
    changeValue(state, action) {
      state.movieOrTV = action.payload.movieOrTV;
    },
  },
});

export const movieOrTVAction = movieOrTV.actions;
export default movieOrTV.reducer;
