import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  pagValue: 1,
};

const pageValue = createSlice({
  name: "pageValue",
  initialState,
  reducers: {
    changeValue(state, action) {
      state.pagValue = action.payload;
    },
  },
});

export const PagValueAction = pageValue.actions;
export default pageValue.reducer;
