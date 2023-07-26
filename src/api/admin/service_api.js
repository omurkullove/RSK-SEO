import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

const ADMIN_PANEL_SERVICE = '/admin_panel/services/';

export const service_api = createApi({
   reducerPath: 'service/api',
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
   tagTypes: ['Service'],
   endpoints: (builder) => ({
      getService: builder.query({
         query: () => ADMIN_PANEL_SERVICE,
         providesTags: ['Service'],
      }),

      createService: builder.mutation({
         query: (body) => ({
            url: ADMIN_PANEL_SERVICE,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Service'],
      }),

      updateService: builder.mutation({
         query: (body) => ({
            url: `${ADMIN_PANEL_SERVICE}${body.id}/`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['Service'],
      }),

      removeService: builder.mutation({
         query: (id) => ({
            url: `${ADMIN_PANEL_SERVICE}${id}/`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Service'],
      }),
   }),
});

export const {
   useGetServiceQuery,
   useCreateServiceMutation,
   useRemoveServiceMutation,
   useUpdateServiceMutation,
} = service_api;
