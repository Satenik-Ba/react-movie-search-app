import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userName: '',
    userEmail: '',
    userId: '',
    isAuthenticated: false,
    isUser: ''
};

const UserInfo = createSlice({
  name: 'UserInfo',
  initialState,
  reducers: {
    setUserInfo(state, action) { 
      state.userEmail = action.payload;
      state.userName = action.payload.userName;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
      state.isUser = action.payload;
    },
    setLogout(state) {
      state.userEmail = '';
      state.userName = '';
      state.userId = '';
      state.isAuthenticated = false;
    },
  },
});

export const UserInfoActions = UserInfo.actions;
export default UserInfo.reducer;
