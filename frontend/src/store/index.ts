import { configureStore } from '@reduxjs/toolkit';
import { accountSlice } from './account';

export const store = configureStore({
  reducer: {
    [accountSlice.name]: accountSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
