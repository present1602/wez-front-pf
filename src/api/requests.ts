import axios from 'axios';
import Cookies from 'js-cookie';
import AppHistory from '../AppHistory';
import { API_BASE_URL } from '../constants/config';

const baseUrl = API_BASE_URL;

const instance = axios.create({ baseURL: baseUrl, withCredentials: true });

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.request.status === 401) {
      Cookies.remove('type');
      Cookies.remove('admin_id');
      window.localStorage.removeItem('user');
      return AppHistory.push('/login');
    } else {
      console.log('api error : ', error);
    }
  }
);

export const requests = {
  get: (url: string, body?: {}) => instance.get(url, body),
  post: (url: string, body: {}, headers?: {}) => instance.post(url, body, { headers: headers }),
  put: (url: string, body: {}, headers?: {}) => instance.put(url, body),
  delete: (url: string, body?: {}) => instance.delete(url, body)
};
