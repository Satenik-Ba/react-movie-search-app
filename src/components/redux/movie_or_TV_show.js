import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieOrShow: "",
};

const movie_or_TV_show = createSlice({
  name: "movie_or_TV_show",
  initialState,
  reducers: {
    changeValue(state, action) {
      state.movieOrShow = action.payload;
    },
  },
});

export const movieOrShowAction = movie_or_TV_show.actions;
export default movie_or_TV_show.reducer;
