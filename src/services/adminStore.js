import { API } from '@/utils/utils';
import axios from 'axios';
import { create } from 'zustand';

export const useAdmin = create((set, get) => ({
   employeeList: [],
   queueList: [],
   serviceList: [],
   documents: [],

   isEmployeeListLoading: false,
   isQueueListLoading: false,
   isServiceListLoading: false,
   isBranchListLoading: false,
   isDocumentsLoading: false,

   getEmployeeList: async (token) => {
      set({ isEmployeeListLoading: true });
      try {
         const res = await axios(`${API}/admin_panel/users`, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
         set({ employeeList: res.data });
      } catch (err) {
         console.log(err);
      } finally {
         set({ isEmployeeListLoading: false });
      }
   },

   createEmployee: async (token, body) => {
      set({ isEmployeeListLoading: true });
      try {
         await axios.post(`${API}/admin_panel/users/`, body, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
      } catch (err) {
         console.log(err);
      } finally {
         set({ isEmployeeListLoading: false });
      }
   },
   deleteEmployee: async (token, id) => {
      set({ isEmployeeListLoading: true });
      try {
         await axios.delete(`${API}/admin_panel/users/${id}/`, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
      } catch (err) {
         console.log(err);
      } finally {
         set({ isEmployeeListLoading: false });
      }
   },

   // Queue
   getQueueList: async (token) => {
      set({ isQueueListLoading: true });

      try {
         const res = await axios(`${API}/admin_panel/queues/`, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
         set({ queueList: res.data });
      } catch (error) {
      } finally {
         set({ isQueueListLoading: false });
      }
   },

   createQueue: async (token, body) => {
      set({ isQueueListLoading: true });
      try {
         await axios.post(`${API}/admin_panel/queues/`, body, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
      } catch (error) {
      } finally {
         set({ isQueueListLoading: false });
      }
   },
   deleteQueue: async (token, id) => {
      set({ isQueueListLoading: true });
      try {
         await axios.delete(`${API}/admin_panel/queues/${id}`, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
      } catch (error) {
      } finally {
         set({ isQueueListLoading: false });
      }
   },

   // Serice
   getServiceList: async (token) => {
      set({ isServiceListLoading: true });

      try {
         const res = await axios(`${API}/admin_panel/services/`, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
         set({ serviceList: res.data });
      } catch (error) {
      } finally {
         set({ isServiceListLoading: false });
      }
   },

   createService: async (token, body) => {
      set({ isServiceListLoading: true });
      try {
         await axios.post(`${API}/admin_panel/services/`, body, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
      } catch (error) {
      } finally {
         set({ isServiceListLoading: false });
      }
   },
   deleteService: async (token, id) => {
      set({ isServiceListLoading: true });
      try {
         await axios.delete(`${API}/admin_panel/services/${id}`, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
      } catch (error) {
      } finally {
         set({ isServiceListLoading: false });
      }
   },
   getBranchList: async (token) => {
      set({ isBranchListLoading: true });

      try {
         const res = await axios(`${API}/branch/list/`, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
         set({ branchList: res.data });
      } catch (error) {
      } finally {
         set({ isBranchListLoading: false });
      }
   },

   submitDocuments: async (token, body) => {
      set({ isDocumentsLoading: true });

      try {
         await axios.post(`${API}/admin_panel/documents/`, body, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
      } catch (err) {
         console.log(err);
      } finally {
         set({ isDocumentsLoading: false });
      }
   },
   getDocuments: async (token) => {
      set({ isDocumentsLoading: true });
      try {
         const res = await axios.get(`${API}/admin_panel/documents/`, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
         set({ documents: res.data });
      } catch (err) {
         console.log(err);
      } finally {
         set({ isDocumentsLoading: false });
      }
   },
   deleteDocument: async (token, id) => {
      set({ isDocumentsLoading: true });
      try {
         await axios.delete(`${API}/admin_panel/documents/${id}`, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
      } catch (error) {
      } finally {
         set({ isDocumentsLoading: false });
      }
   },
}));
