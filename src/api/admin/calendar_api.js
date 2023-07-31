import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

const ADMIN_PANEL_DAYOFFS = '/admin_panel/dayoffs/';

export const calendar_api = createApi({
   reducerPath: 'calendar/api',
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

   tagTypes: ['calendar'],

   endpoints: (builder) => ({
      getDays: builder.query({
         query: () => ADMIN_PANEL_DAYOFFS,
         providesTags: ['calendar'],
      }),

      postDays: builder.mutation({
         query: (body) => ({
            url: ADMIN_PANEL_DAYOFFS + 'create_multiple_dayoffs/',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['calendar'],
      }),

      deleteDays: builder.mutation({
         query: (body) => ({
            url: ADMIN_PANEL_DAYOFFS + 'delete_multiple_dayoffs/',
            method: 'POST',
            body,
         }),
         invalidatesTags: ['calendar'],
      }),
   }),
});

export const { useGetDaysQuery, usePostDaysMutation, useDeleteDaysMutation } = calendar_api;
