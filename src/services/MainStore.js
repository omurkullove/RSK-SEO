import axios from 'axios';
import { axiosInstance } from '@/axios';
import { create } from 'zustand';

export const useMain = create((set, get) => ({
   email: {},
   token: JSON.parse(localStorage.getItem('token')) || {},
   employee: {},
   error: [],

   isDarkMode: false,

   isSuperAdmin: false,
   getProfileInfoLoading: false,

   login: async (body, navigate) => {
      try {
         const res = await axiosInstance.post('/employee/login/', body);
         localStorage.setItem('token', JSON.stringify(res.data));
         localStorage.setItem('email', JSON.stringify(body.email));
         set({ token: res.data });
         switch (res.data?.position) {
            case 'operator':
               navigate('/operator/home');
               break;
            case 'registrator':
               navigate('/registrar/home');
               break;
            case 'admin':
            case 'super_admin':
               navigate('/admin/home');
               break;

            default:
               break;
         }
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
      }
   },

   getProfileInfo: async () => {
      set({ getProfileInfoLoading: true });
      try {
         const res = await axiosInstance('/employee/retrieve/');
         set({ employee: res.data });
      } catch (err) {
         ShowMessage('error', err.message);
      } finally {
         set({ getProfileInfoLoading: false });
      }
   },
   toggleDarkMode: (checked) => {
      set({ isDarkMode: checked });
   },
   adminIdentifier: () => {
      const admin = JSON.parse(localStorage.getItem('token'));
      switch (admin.position) {
         case 'admin':
            set({ isSuperAdmin: false });
            break;
         case 'super_admin':
            set({ isSuperAdmin: true });
            break;

         default:
            set({ isSuperAdmin: false });
      }
   },
}));
