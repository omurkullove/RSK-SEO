import { API, ShowMessage } from '@/utils/utils';

import { axiosInstance } from '@/axios';
import { create } from 'zustand';

export const useOperator = create((set, get) => ({
   errors: [],
   token: JSON.parse(localStorage.getItem('token')) || {},
   talons: [],
   currentTalon: {},
   clients_per_day: {},
   queueBranch: [],

   loginLoading: false,
   getTalonsLoading: false,
   transferTalonToEndLoading: false,
   isBranchLoading: false,

   getTalons: async () => {
      set({ getTalonsLoading: true });
      try {
         const res = await axiosInstance(`${API}/employee/queue/`);
         set({ talons: res.data.talons });
         set({ clients_per_day: res.data.clients_per_day });
         set({ currentTalon: res.data.talons[0] });
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   transferTalonToEnd: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axiosInstance(`${API}/talon/end/${id}/`);
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   transferTalonToStart: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axiosInstance(`${API}/talon/start/${id}/`);
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ getTalonsLoading: false });
      }
   },
   transferTalonToAnotherQueue: async (talonId, queueId) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axiosInstance(`${API}/talon/transfer/${talonId}/${queueId}`);
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   deleteTalon: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axiosInstance(`${API}/talon/remove/${id}/`);
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   serviceStart: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axiosInstance(`${API}/talon/service-start/${id}/`);
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   serviceEnd: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axiosInstance(`${API}/talon/service-end/${id}/`);
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   getBranchQueues: async (id) => {
      set({ isBranchLoading: true });

      try {
         const res = await axiosInstance(`/branch/queue/${id}`);
         set({ queueBranch: res.data });
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ isBranchLoading: false });
      }
   },
}));
