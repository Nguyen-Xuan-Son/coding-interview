import { createSlice } from '@reduxjs/toolkit';

interface IAccount {
  email: string;
}

const initialState: IAccount = {
  email: '',
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
});

export const { logout } = accountSlice.actions;

export default accountSlice.reducer;
