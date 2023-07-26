import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

const ADMIN_PANEL_BRANCH = '/admin_panel/branches/';

export const branch_api = createApi({
   reducerPath: 'branch/api',
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
   tagTypes: ['Branch'],
   endpoints: (builder) => ({
      getBranch: builder.query({
         query: () => ADMIN_PANEL_BRANCH,
         providesTags: ['Branch'],
      }),

      createBranch: builder.mutation({
         query: (body) => ({
            url: ADMIN_PANEL_BRANCH,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Branch'],
      }),

      updateBranch: builder.mutation({
         query: (body) => ({
            url: `${ADMIN_PANEL_BRANCH}${body.id}/`,
            method: 'PUT',
            body,
         }),
         invalidatesTags: ['Branch'],
      }),

      removeBranch: builder.mutation({
         query: (id) => ({
            url: `${ADMIN_PANEL_BRANCH}${id}/`,
            method: 'DELETE',
         }),
         invalidatesTags: ['Branch'],
      }),
   }),
});

export const {
   useGetBranchQuery,
   useCreateBranchMutation,
   useRemoveBranchMutation,
   useUpdateBranchMutation,
} = branch_api;
