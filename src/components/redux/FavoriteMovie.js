import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favMovies: {},
};

const FavoriteMovie = createSlice({
  name: "FavoriteMovie",
  initialState,
  reducers: {
    setFavoriteMovies(state, action) {
      state.favMovies = action.payload.favMovies;
    },
  },
});

export const favoriteMovieAction = FavoriteMovie.actions;
export default FavoriteMovie.reducer;
