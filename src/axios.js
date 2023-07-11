import axios from 'axios';

export const axiosInstance = axios.create({
   baseURL: 'https://rskseo.pythonanywhere.com',
});

axiosInstance.interceptors.request.use(
   (config) => {
      const token = JSON.parse(localStorage.getItem('token'));

      if (token) {
         config.headers['Authorization'] = `Bearer ${token.access}`;
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);
