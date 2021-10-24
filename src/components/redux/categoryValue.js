import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  catValue: "",
  catName: 'All Categories'
};

const categoryValue = createSlice({
  name: "categoryValue",
  initialState,
  reducers: {
    changeValue(state, action) {
      state.catValue = action.payload.catValue;
    },
    resetCatValue(state){
      state.catValue = ''; 
      state.catName = 'All Categories'
    }
  },
});

export const CatValueAction = categoryValue.actions;
export default categoryValue.reducer;
