import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

const ADMIN_PANEL_REPORT = '/admin_panel/reports/';

const STAT = '/stats/branch-talon-stats/';

export const report_api = createApi({
   reducerPath: 'report/api',
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
   tagTypes: ['Stats', 'Report'],
   endpoints: (builder) => ({
      getStat: builder.mutation({
         query: (body) => ({
            url: STAT,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Stats'],
      }),

      getReport: builder.query({
         query: () => ADMIN_PANEL_REPORT,
         invalidatesTags: ['Report'],
      }),

      createReport: builder.mutation({
         query: (body) => ({
            url: ADMIN_PANEL_REPORT,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['Report'],
      }),
   }),
});

export const { useGetStatMutation, useCreateReportMutation, useGetReportQuery } = report_api;
