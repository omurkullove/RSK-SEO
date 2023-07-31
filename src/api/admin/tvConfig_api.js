import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

export const tvConfig_api = createApi({
   reducerPath: 'tvConfig/api',
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
   tagTypes: ['tv', 'runnigLine'],
   endpoints: (builder) => ({
      getAd: builder.query({
         query: () => '/branch/get_ad/',
         providesTags: ['tv'],
      }),

      createAd: builder.mutation({
         query: (body) => ({
            url: '/admin_panel/post_ad/',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['tv'],
      }),

      removeAd: builder.mutation({
         query: (id) => ({
            url: `/admin_panel/change_ad/${id}/`,
            method: 'DELETE',
         }),
         invalidatesTags: ['tv'],
      }),

      editAd: builder.mutation({
         query: (body) => ({
            url: `/admin_panel/change_ad/${body.id}/`,
            method: 'PUT',
            body: body.data,
         }),
         invalidatesTags: ['tv'],
      }),

      getRunnigLine: builder.query({
         query: () => '/branch/get_string/',
         providesTags: ['runnigLine'],
      }),

      createRunningLine: builder.mutation({
         query: (body) => ({
            url: 'admin_panel/post_string/',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['runnigLine'],
      }),

      removeRunningLine: builder.mutation({
         query: (id) => ({
            url: `/admin_panel/change_string/${id}/`,
            method: 'DELETE',
         }),
         invalidatesTags: ['runnigLine'],
      }),

      editRunningLine: builder.mutation({
         query: (body) => ({
            url: `/admin_panel/change_string/${body.id}/`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['runnigLine'],
      }),
   }),
});

export const {
   useGetAdQuery,
   useCreateAdMutation,
   useRemoveAdMutation,
   useEditAdMutation,
   useGetRunnigLineQuery,
   useCreateRunningLineMutation,
   useRemoveRunningLineMutation,
   useEditRunningLineMutation,
} = tvConfig_api;
