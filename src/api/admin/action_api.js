import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

const ADMIN_PANEL_ACTION = '/admin_panel/actions/';

export const action_api = createApi({
   reducerPath: 'action/api',
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
   endpoints: (builder) => ({
      getAction: builder.query({
         query: () => ADMIN_PANEL_ACTION,
      }),

      createAction: builder.mutation({
         query: (body) => ({
            url: ADMIN_PANEL_ACTION,
            method: 'POST',
            body,
         }),
      }),

      removeAction: builder.mutation({
         query: (id) => ({
            url: `${ADMIN_PANEL_ACTION}${id}/`,
            method: 'DELETE',
         }),
      }),
   }),
});

export const { useGetActionQuery, useCreateActionMutation, useRemoveActionMutation } = action_api;
