import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

export const operator_api = createApi({
   reducerPath: 'operator/api',
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
         query: () => '/employee/queue/',
         providesTags: ['talon'],
      }),

      transferTalonToEnd: builder.query({
         query: (id) => ({
            url: `/talon/end/${id}`,
         }),
         providesTags: ['talon'],
      }),

      transferTalonToStart: builder.query({
         query: (id) => ({
            url: `/talon/start/${id}`,
         }),
         providesTags: ['talon'],
      }),

      transferTalonQueue: builder.query({
         query: (body) => ({
            url: `/talon/transfer/${body.talonId}/${body.queueId}`,
         }),
         providesTags: ['talon'],
      }),

      removeTalon: builder.query({
         query: (id) => ({
            url: `/talon/remove/${id}/`,
         }),
         providesTags: ['talon'],
      }),

      serviceStart: builder.query({
         query: (id) => ({
            url: `/talon/service-start/${id}/`,
         }),
         providesTags: ['talon'],
      }),

      serviceEnd: builder.query({
         query: (id) => ({
            url: `/talon/service-end/${id}/`,
         }),
         providesTags: ['talon'],
      }),

      getBranchQueue: builder.query({
         query: (id) => ({
            url: `/branch/queue/${id}`,
         }),
         providesTags: ['talon'],
      }),
   }),
});

export const {
   useGetTalonQuery,
   useLazyTransferTalonToEndQuery,
   useLazyTransferTalonToStartQuery,
   useLazyTransferTalonQueueQuery,
   useLazyRemoveTalonQuery,
   useLazyServiceStartQuery,
   useLazyServiceEndQuery,
   useLazyGetBranchQueueQuery,
} = operator_api;
