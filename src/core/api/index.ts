import axios, { AxiosRequestConfig } from 'axios';

import { AUTH_TOKEN } from '@/shared/files/consts';

//==============================
// INSTANCES
//==============================

// JSON PLACEHOLDER
const JSON_PLACEHOLDER_INSTANCE = axios.create({
  baseURL: 'http://jsonplaceholder.typicode.com/',
});

JSON_PLACEHOLDER_INSTANCE.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const authToken = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);

    config.headers['Authorization'] = `Bearer ${authToken}`;
    // config.url = `${request.url}?authKey=${localStorage.getItem(AUTH_TOKEN)}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// MOCKY
export const MOCKY_INSTANCE = axios.create({
  baseURL: 'http://www.mocky.io/v2/',
});

//==============================
// ENDPOINTS
//==============================

export const ENDPOINTS = {
  blog: {
    categories: '5bb20b802e00009015927389/',
    posts: 'posts/',
  },
  contactForm: {
    favoriteColors: '5dbf1e1f3300003972a0e512/',
  },
  auth: {
    login: '5bd312b23400002a00cfe028/',
    register: '5bd311fc3400006f00cfe021/',
  },
};

export default JSON_PLACEHOLDER_INSTANCE;
