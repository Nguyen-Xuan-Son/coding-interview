import { createSlice } from '@reduxjs/toolkit';
import { login } from '../service/auth';
import { getAccountInfo } from '../service/account';

interface IAccount {
  id: number;
  email: string;
  isLoggedIn: boolean;
}

const initialState: IAccount = {
  id: 0,
  email: '',
  isLoggedIn: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state) => {
      state.email = '';
      state.id = 0;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.isLoggedIn = true;
    });
    builder.addCase(getAccountInfo.fulfilled, (state, { payload }) => {
      state.id = payload?.id;
      state.email = payload?.email;
    });
  },
});

export const { logout } = accountSlice.actions;

export default accountSlice.reducer;
