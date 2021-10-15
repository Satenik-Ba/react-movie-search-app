import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    userEmail: '',
    userId: '',
    isAuthenticated: false,
};

const UserInfo = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    setUserInfo(state, action) { 
      state.userEmail = action.payload;
      state.userName = action.payload;
      state.userId = action.payload;
      state.isAuthenticated = true;
    },
    setLogout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const UserInfoActions = UserInfo.actions;
export default UserInfo.reducer;
