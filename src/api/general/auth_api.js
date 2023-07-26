import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

export const auth_api = createApi({
   reducerPath: 'auth/api',
   baseQuery: fetchBaseQuery({
      baseUrl: baseUrl,
      prepareHeaders: (headers) => {
         const token = getBearerToken();
         if (token) {
            headers.set('Authorization', `Bearer ${token.access}`);
         }
         return headers;
      },
   }),
   tagTypes: ['user'],
   endpoints: (builder) => ({
      loginEmployee: builder.mutation({
         query: (body) => ({
            url: '/employee/login/',
            method: 'POST',
            body,
         }),
      }),
      getProfileInfo: builder.query({
         query: () => '/employee/retrieve/',
      }),
   }),
});

export const { useLoginEmployeeMutation, useGetProfileInfoQuery } = auth_api;
