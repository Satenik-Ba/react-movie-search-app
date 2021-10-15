import { configureStore } from '@reduxjs/toolkit';
import UserInfo from './UserInfo';
import categoryValue from './categoryValue';

const store = configureStore({
  reducer: {
    userInfo: UserInfo,
    categoryValue: categoryValue,
  },
});

export default store;