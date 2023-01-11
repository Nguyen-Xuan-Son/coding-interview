import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '../config/axios';

export const getAccountInfo = createAsyncThunk(
  'get-account-info',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('api/v1/users/account');
      return response.data.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
