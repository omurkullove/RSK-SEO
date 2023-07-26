import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

const ADMIN_PANEL_QUEUES = '/admin_panel/queues/';

export const queue_api = createApi({
   reducerPath: 'queue/api',
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
   tagTypes: ['Queue'],

   endpoints: (builder) => ({
      getQueue: builder.query({
         query: () => ADMIN_PANEL_QUEUES,
         providesTags: ['Queue'],
      }),

      createQueue: builder.mutation({
         query: (body) => ({
            url: ADMIN_PANEL_QUEUES,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Queue'],
      }),

      updateQueue: builder.mutation({
         query: (body) => ({
            url: `${ADMIN_PANEL_QUEUES}${body.id}/`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['Queue'],
      }),

      removeQueue: builder.mutation({
         query: (id) => ({
            url: `${ADMIN_PANEL_QUEUES}${id}/`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Queue'],
      }),
   }),
});

export const {
   useGetQueueQuery,
   useCreateQueueMutation,
   useRemoveQueueMutation,
   useUpdateQueueMutation,
} = queue_api;
