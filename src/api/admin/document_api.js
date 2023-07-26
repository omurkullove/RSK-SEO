import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

const ADMIN_PANEL_DOCUMENT = '/admin_panel/documents/';

export const document_api = createApi({
   reducerPath: 'document/api',
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
   tagTypes: ['Document'],
   endpoints: (builder) => ({
      getDocument: builder.query({
         query: () => ADMIN_PANEL_DOCUMENT,
         providesTags: ['Document'],
      }),

      createDocument: builder.mutation({
         query: (body) => ({
            url: ADMIN_PANEL_DOCUMENT,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Document'],
      }),

      updateDocument: builder.mutation({
         query: (body) => ({
            url: `${ADMIN_PANEL_DOCUMENT}${body.id}/`,
            method: 'PUT',
            body: body.data,
         }),
         invalidatesTags: ['Document'],
      }),

      removeDocument: builder.mutation({
         query: (id) => ({
            url: `${ADMIN_PANEL_DOCUMENT}${id}/`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Document'],
      }),
   }),
});
export const {
   useGetDocumentQuery,
   useCreateDocumentMutation,
   useRemoveDocumentMutation,
   useUpdateDocumentMutation,
} = document_api;
