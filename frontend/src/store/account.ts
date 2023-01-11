import { createSlice } from '@reduxjs/toolkit';
import { login } from '../service/auth';
import { getAccountInfo } from '../service/account';

interface IAccount {
  email: string;
  isLoggedIn: boolean;
}

const initialState: IAccount = {
  email: '',
  isLoggedIn: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    logout: (state) => {
      state.email = '';
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.isLoggedIn = true;
    });
    builder.addCase(getAccountInfo.fulfilled, (state, { payload }) => {
      state.email = payload?.email;
    });
  },
});

export const { logout } = accountSlice.actions;

export default accountSlice.reducer;
