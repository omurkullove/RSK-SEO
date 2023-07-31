import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

export const registrar_api = createApi({
   reducerPath: 'registrar/api',
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
   tagTypes: ['talon'],
   endpoints: (builder) => ({
      getTalon: builder.query({
         query: () => '/employee/registrator/',
         providesTags: ['talon'],
      }),

      printTalons: builder.mutation({
         query: (body) => ({
            url: '/talon/registrator-talon/',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['talon'],
      }),

      deleteTalon: builder.query({
         query: (id) => ({
            url: `/talon/registrator/remove/${id}/`,
         }),
         providesTags: ['talon'],
      }),

      getBranchList: builder.query({
         query: () => ({
            url: '/branch/list/',
         }),
      }),
   }),
});

export const {
   useGetTalonQuery,
   usePrintTalonsMutation,
   useLazyDeleteTalonQuery,
   useGetBranchListQuery,
} = registrar_api;
