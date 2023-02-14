import axios from 'axios';
import { FetchTime } from '../interfaces';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_AUTH_PHRASE}`
  }
});

export const Api = {
  getTime: async (): Promise<number> => {
    try {
      const getTime: FetchTime = await instance.get('/time').then((res) => res.data);

      return getTime.epoch;
    } catch (err) {
      console.error('Error get time: ', err);
      return 0;
    }
  },

  getMetrics: async (): Promise<string> => {
    try {
      return await instance.get('/metrics').then((res) => res.data);
    } catch (err) {
      console.error('Error get metrics: ', err);
      return '';
    }
  }
};
