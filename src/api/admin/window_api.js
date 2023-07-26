import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

const ADMIN_PANEL_WINDOW = '/admin_panel/windows/';

export const window_api = createApi({
   reducerPath: 'window/api',
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
   tagTypes: ['Window'],
   endpoints: (builder) => ({
      getWindow: builder.query({
         query: () => ADMIN_PANEL_WINDOW,
         providesTags: ['Window'],
      }),

      createWindow: builder.mutation({
         query: (body) => ({
            url: ADMIN_PANEL_WINDOW,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Window'],
      }),

      updateWindow: builder.mutation({
         query: (body) => ({
            url: `${ADMIN_PANEL_WINDOW}${body.id}/`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['Window'],
      }),

      removeWindow: builder.mutation({
         query: (id) => ({
            url: `${ADMIN_PANEL_WINDOW}${id}/`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Window'],
      }),
   }),
});

export const {
   useGetWindowQuery,
   useCreateWindowMutation,
   useRemoveWindowMutation,
   useUpdateWindowMutation,
} = window_api;
