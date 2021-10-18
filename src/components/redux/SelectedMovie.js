import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMovie: {},
  isSelected: false
};

const SelectedMovie = createSlice({
  name: "selectedMovie",
  initialState,
  reducers: {
    changeMovie(state, action) {
      state.selectedMovie = action.payload;
      state.isSelected = true; 
    },
    isSelected(state){
      state.isSelected = false;
    }
  },
});

export const selectedMovieAction = SelectedMovie.actions;
export default SelectedMovie.reducer;
