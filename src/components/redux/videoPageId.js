import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoId: "",
};

const videoPageId = createSlice({
  name: "videoPageId",
  initialState,
  reducers: {
    changeId(state, action) {
      state.videoId = action.payload;
    },
  },
});

export const VideoIdAction = videoPageId.actions;
export default videoPageId.reducer;
