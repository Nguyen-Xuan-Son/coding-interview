import axios from 'axios';

import { LOCAL_STORAGE_KEYS } from '../constant';
import { SERVER_URL } from '../constant/env';

const instance = axios.create({
  baseURL: SERVER_URL,
});

instance.interceptors.request.use(
  (request) => {
    request.headers = {};

    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    if (!!token) request.headers['authorization'] = token;

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    if (error?.response?.data?.statusCode === 401) {
      // TODO
    }
    return Promise.reject(error);
  }
);

export default instance;
