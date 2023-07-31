import { action_api } from './api/admin/action_api';
import { auth_api } from '@/api/general/auth_api';
import { branch_api } from './api/admin/branch_api';
import { calendar_api } from './api/admin/calendar_api';
import { configureStore } from '@reduxjs/toolkit';
import { db_api } from './api/admin/db_api';
import { document_api } from './api/admin/document_api';
import { employee_api } from './api/admin/employee_api';
import { language_api } from './api/admin/language_api';
import { operator_api } from './api/operator/operator_api';
import { queue_api } from './api/admin/queue_api';
import { registrar_api } from './api/registrar/registrar_api';
import { report_api } from './api/admin/report_api';
import { service_api } from './api/admin/service_api';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import synchronous from './api/synchronous';
import { tvConfig_api } from './api/admin/tvConfig_api';
import { window_api } from './api/admin/window_api';

export const store = configureStore({
   reducer: {
      [action_api.reducerPath]: action_api.reducer,
      [branch_api.reducerPath]: branch_api.reducer,
      [document_api.reducerPath]: document_api.reducer,
      [employee_api.reducerPath]: employee_api.reducer,
      [language_api.reducerPath]: language_api.reducer,
      [queue_api.reducerPath]: queue_api.reducer,
      [report_api.reducerPath]: report_api.reducer,
      [service_api.reducerPath]: service_api.reducer,
      [window_api.reducerPath]: window_api.reducer,
      [tvConfig_api.reducerPath]: tvConfig_api.reducer,
      [calendar_api.reducerPath]: calendar_api.reducer,
      [db_api.reducerPath]: db_api.reducer,

      [operator_api.reducerPath]: operator_api.reducer,
      [registrar_api.reducerPath]: registrar_api.reducer,

      [auth_api.reducerPath]: auth_api.reducer,

      toggleDarkMode: synchronous,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
         .concat(action_api.middleware)
         .concat(auth_api.middleware)
         .concat(branch_api.middleware)
         .concat(document_api.middleware)
         .concat(employee_api.middleware)
         .concat(language_api.middleware)
         .concat(queue_api.middleware)
         .concat(report_api.middleware)
         .concat(service_api.middleware)
         .concat(window_api.middleware)
         .concat(operator_api.middleware)
         .concat(registrar_api.middleware)
         .concat(tvConfig_api.middleware)
         .concat(calendar_api.middleware)
         .concat(db_api.middleware),
});

setupListeners(store.dispatch);
