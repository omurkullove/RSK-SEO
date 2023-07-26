import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { baseUrl } from '@/utils/utils';

const getBearerToken = () => {
   return JSON.parse(localStorage.getItem('token'));
};

const ADMIN_PANEL_EMPLOYEE = '/admin_panel/users/';

export const employee_api = createApi({
   reducerPath: 'employee/api',
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
   tagTypes: ['employee'],
   endpoints: (builder) => ({
      getEmployeeList: builder.query({
         query: () => ADMIN_PANEL_EMPLOYEE,
         providesTags: ['employee'],
      }),

      createEmployee: builder.mutation({
         query: (body) => ({
            url: ADMIN_PANEL_EMPLOYEE,
            method: 'POST',
            body,
         }),
         invalidatesTags: ['employee'],
      }),

      deleteEmployee: builder.mutation({
         query: (id) => ({
            url: `${ADMIN_PANEL_EMPLOYEE}${id}/`,
            method: 'DELETE',
         }),
         invalidatesTags: ['employee'],
      }),

      editEmployee: builder.mutation({
         query: (body) => ({
            url: `${ADMIN_PANEL_EMPLOYEE}${body.id}/`,
            method: 'PUT',
            body,
            invalidatesTags: ['employee'],
         }),
      }),
   }),
});

export const {
   useGetEmployeeListQuery,
   useCreateEmployeeMutation,
   useDeleteEmployeeMutation,
   useEditEmployeeMutation,
   useLazyGetEmployeeListQuery,
} = employee_api;
