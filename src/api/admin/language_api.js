import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

const ADMIN_PANEL_LANGUAGE = '/admin_panel/languages/';

export const language_api = createApi({
   reducerPath: 'language/api',
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
   tagTypes: ['Language'],

   endpoints: (builder) => ({
      getLanguage: builder.query({
         query: () => ADMIN_PANEL_LANGUAGE,
         providesTags: ['Language'],
      }),

      createLanguage: builder.mutation({
         query: (body) => ({
            url: ADMIN_PANEL_LANGUAGE,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Language'],
      }),

      removeLanguage: builder.mutation({
         query: (id) => ({
            url: `${ADMIN_PANEL_LANGUAGE}${id}/`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Language'],
      }),
   }),
});

export const { useGetLanguageQuery, useCreateLanguageMutation, useRemoveLanguageMutation } =
   language_api;
