import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '../config/axios';
import { LOCAL_STORAGE_KEYS } from '../constant';

export const login = createAsyncThunk(
  'login',
  async (
    payload: {
      email: string;
      password: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/auth/login', payload);

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
        response.data.token
      );
      return { ...response.data };
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const register = createAsyncThunk(
  'register',
  async (
    payload: {
      email: string;
      password: string;
      rePassword: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/auth/register', payload);

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
        response.data.token
      );

      return { ...response.data };
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
