import axios, { AxiosInstance } from 'axios';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://x8ki-letl-twmt.n7.xano.io/api:2FKDP4gF/',
  headers: { Authorization: localStorage.getItem('token') },
});
