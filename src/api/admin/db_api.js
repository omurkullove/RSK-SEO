import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

const ADMIN_PANEL_DAYOFFS = '/admin_panel/dayoffs/';

export const db_api = createApi({
   reducerPath: 'db/api',
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

   tagTypes: ['db'],

   endpoints: (builder) => ({
      getBackup: builder.query({
         query: () => '/db/backups/',
         providesTags: ['db'],
      }),

      postBackup: builder.mutation({
         query: () => ({
            url: '/db/backup/',
            method: 'POST',
         }),
         invalidatesTags: ['db'],
      }),

      restore: builder.mutation({
         query: (body) => ({
            url: '/db/restore/',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['db'],
      }),
   }),
});

export const { useGetBackupQuery, usePostBackupMutation, useRestoreMutation } = db_api;
