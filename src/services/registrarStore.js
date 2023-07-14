import { API, ShowMessage } from '@/utils/utils';

import axios from 'axios';
import { axiosInstance } from '@/axios';
import { create } from 'zustand';
import zustand from 'zustand';

export const useRegistrar = create((set, get) => ({
   errors: [],
   token: JSON.parse(localStorage.getItem('token')) || {},
   talons: [],
   employee: {},
   clients_per_day: {},

   loginLoading: false,
   getTalonsLoading: false,
   talons: [],

   getTalons: async () => {
      set({ getTalonsLoading: true });
      try {
         const res = await axiosInstance(`${API}/employee/registrator/`);
         set({ talons: res.data.talons });
         set({ clients_per_day: res.data.clients_per_day });
      } catch (error) {
         ShowMessage('error', error.message);
      } finally {
         set({ getTalonsLoading: false });
      }
   },

   // Print talon with personal id
   printTalons: async () => {
      try {
         await axiosInstance.post(`${API}/talons/print`, { id });
         console.log(' <<< Успешно распечатан талон с id:', id);
      } catch (error) {
         ShowMessage('error', error.message);
      }
   },

   // Delete talon
   deleteTalon: async (id) => {
      set({ getTalonsLoading: true });
      try {
         const res = await axiosInstance(`${API}/talon/remove/${id}/`);
      } catch (error) {
         ShowMessage('error', error.message);
      } finally {
         set({ getTalonsLoading: false });
      }
   },
}));
