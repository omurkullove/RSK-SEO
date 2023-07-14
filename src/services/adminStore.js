import { API, ShowMessage } from '@/utils/utils';

import axios from 'axios';
import { axiosInstance } from '@/axios';
import { create } from 'zustand';

export const useAdmin = create((set, get) => ({
   employeeList: [],
   queueList: [],
   serviceList: [],
   documents: [],
   talonStats: [],
   error: {},

   isEmployeeListLoading: false,
   isQueueListLoading: false,
   isServiceListLoading: false,
   isBranchListLoading: false,
   isDocumentsLoading: false,
   isTalonStatsLoading: false,

   getEmployeeList: async () => {
      set({ isEmployeeListLoading: true });
      try {
         const res = await axiosInstance('/admin_panel/users/');
         set({ employeeList: res.data });
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isEmployeeListLoading: false });
      }
   },

   createEmployee: async (body) => {
      set({ isEmployeeListLoading: true });
      try {
         await axiosInstance.post('/admin_panel/users/', body);
         ShowMessage('success', 'Сотрдуник успешно создан');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isEmployeeListLoading: false });
      }
   },
   deleteEmployee: async (id) => {
      set({ isEmployeeListLoading: true });
      try {
         await axiosInstance.delete(`/admin_panel/users/${id}/`);
         ShowMessage('success', 'Сотрдуник успешно удален');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isEmployeeListLoading: false });
      }
   },
   editEmployee: async (id, body) => {
      set({ isEmployeeListLoading: true });
      try {
         await axiosInstance.put(`/admin_panel/users/${id}/`, body);
         ShowMessage('success', 'Сотрдуник успешно изменен');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isEmployeeListLoading: false });
      }
   },

   // Queue
   getQueueList: async () => {
      set({ isQueueListLoading: true });

      try {
         const res = await axiosInstance('/admin_panel/queues/');
         set({ queueList: res.data });
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isQueueListLoading: false });
      }
   },

   createQueue: async (body) => {
      set({ isQueueListLoading: true });
      try {
         await axiosInstance.post('admin_panel/queues/', body);
         ShowMessage('success', 'Очередь успешно создана');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isQueueListLoading: false });
      }
   },
   deleteQueue: async (id) => {
      set({ isQueueListLoading: true });
      try {
         await axiosInstance.delete(`/admin_panel/queues/${id}`);
         ShowMessage('success', 'Очередь успешно удалена');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isQueueListLoading: false });
      }
   },
   editQueue: async (id, body) => {
      set({ isQueueListLoading: true });
      try {
         await axiosInstance.put(`/admin_panel/queues/${id}/`, body);
         ShowMessage('success', 'Очередь успешно изменена');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isQueueListLoading: false });
      }
   },

   // Serice
   getServiceList: async () => {
      set({ isServiceListLoading: true });

      try {
         const res = await axiosInstance('/admin_panel/services/');
         set({ serviceList: res.data });
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isServiceListLoading: false });
      }
   },

   createService: async (body) => {
      set({ isServiceListLoading: true });
      try {
         await axiosInstance.post(`/admin_panel/services/`, body);
         ShowMessage('success', 'Услуга успешно создана');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isServiceListLoading: false });
      }
   },
   deleteService: async (id) => {
      set({ isServiceListLoading: true });
      try {
         await axiosInstance.delete(`/admin_panel/services/${id}/`);
         ShowMessage('success', 'Услуга успешно удалена');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isServiceListLoading: false });
         console.log(id);
      }
   },
   editService: async (id, body) => {
      set({ isServiceListLoading: true });
      try {
         await axiosInstance.put(`/admin_panel/services/${id}/`, body);
         ShowMessage('success', 'Услуга успешно изменена');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isServiceListLoading: false });
      }
   },
   getBranchList: async () => {
      set({ isBranchListLoading: true });
      try {
         const res = await axiosInstance('/branch/list/');
         set({ branchList: res.data });
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isBranchListLoading: false });
      }
   },

   submitDocuments: async (body) => {
      set({ isDocumentsLoading: true });

      try {
         await axiosInstance.post('/admin_panel/documents/', body);
         ShowMessage('success', 'Документ успешно создан');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isDocumentsLoading: false });
      }
   },
   getDocuments: async () => {
      set({ isDocumentsLoading: true });
      try {
         const res = await axiosInstance('/admin_panel/documents/');
         set({ documents: res.data });
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isDocumentsLoading: false });
      }
   },
   deleteDocument: async (id) => {
      set({ isDocumentsLoading: true });
      try {
         await axiosInstance.delete(`/admin_panel/documents/${id}/`);
         ShowMessage('success', 'Документ успешно удален');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isDocumentsLoading: false });
      }
   },
   editDocument: async (id, body) => {
      set({ isDocumentsLoading: true });
      try {
         await axiosInstance.put(`/admin_panel/documents/${id}/`, body);
         ShowMessage('success', 'Документ успешно изменен');
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isDocumentsLoading: false });
      }
   },
}));
