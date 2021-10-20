import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchValue: "",
};

const searchName = createSlice({
  name: "searchName",
  initialState,
  reducers: {
    changeValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const SearchValueAction = searchName.actions;
export default searchName.reducer;
