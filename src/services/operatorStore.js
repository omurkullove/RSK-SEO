import { create } from 'zustand';
import { API, ShowMessage } from '@/utils/utils';
import axios from 'axios';

export const useOperator = create((set, get) => ({
   errors: [],
   token: JSON.parse(localStorage.getItem('token')) || {},
   talons: [],
   currentTalon: {},
   clients_per_day: {},

   loginLoading: false,
   getTalonsLoading: false,
   transferTalonToEndLoading: false,

   getTalons: async (token) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axios.get(`${API}/employee/queue/`, {
            headers: {
               Authorization: `Bearer ${token.access}`,
            },
         });
         set({ talons: res.data.talons });
         set({ clients_per_day: res.data.clients_per_day });
         set({ currentTalon: res.data.talons[0] });
      } catch (err) {
         set({ errors: err });
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   transferTalonToEnd: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axios.get(`${API}/talon/end/${id}/`, {
            headers: {
               Authorization: `Bearer ${get().token.access}`,
            },
         });
      } catch (err) {
         set({ errors: err });
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   transferTalonToStart: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axios.get(`${API}/talon/start/${id}/`, {
            headers: {
               Authorization: `Bearer ${get().token.access}`,
            },
         });
      } catch (err) {
         set({ errors: err });
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   deleteTalon: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axios.get(`${API}/talon/remove/${id}/`, {
            headers: {
               Authorization: `Bearer ${get().token.access}`,
            },
         });
      } catch (err) {
         set({ errors: err });
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   serviceStart: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axios.get(`${API}/talon/service-start/${id}/`, {
            headers: {
               Authorization: `Bearer ${get().token.access}`,
            },
         });
      } catch (err) {
         set({ errors: err });
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   serviceEnd: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axios.get(`${API}/talon/service-end/${id}/`, {
            headers: {
               Authorization: `Bearer ${get().token.access}`,
            },
         });
      } catch (err) {
         set({ errors: err });
      } finally {
         set({ getTalonsLoading: false });
      }
   },
}));
