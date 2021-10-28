import { createSlice } from "@reduxjs/toolkit";
import { POPULAR_MOVIES_API } from "../../constants/APIs";

const initialState = {
  loadingURL: POPULAR_MOVIES_API,
};

const loadingURL = createSlice({
  name: "loadingURL",
  initialState,
  reducers: {
    changeValue(state, action) {
      state.loadingURL = action.payload.loadingURL;
    },
  },
});

export const loadingURLAction = loadingURL.actions;
export default loadingURL.reducer;
