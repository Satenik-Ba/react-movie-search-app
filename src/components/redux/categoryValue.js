import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catValue: "",
};

const categoryValue = createSlice({
  name: "categoryValue",
  initialState,
  reducers: {
    changeValue(state, action) {
      state.catValue = action.payload.catValue;
    },
  },
});

export const CatValueAction = categoryValue.actions;
export default categoryValue.reducer;
