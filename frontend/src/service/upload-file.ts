import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '../config/axios';

export const uploadDocument = createAsyncThunk(
  'upload-document',
  async (
    payload: {
      hash: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('api/v1/document', payload);

      return response.data.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);

export const checkDocument = createAsyncThunk(
  'check-document',
  async (
    payload: {
      hash: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put('api/v1/document', payload);

      return response.data.data;
    } catch (err) {
      return rejectWithValue((err as AxiosError).message);
    }
  }
);
