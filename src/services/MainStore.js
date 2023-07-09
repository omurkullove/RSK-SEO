import { API, ShowMessage } from '@/utils/utils';
import axios from 'axios';
import { create } from 'zustand';

export const useMain = create((set, get) => ({
   email: {},
   token: JSON.parse(localStorage.getItem('token')) || {},
   employee: {},
   isSuperAdmin: false,

   isDarkMode: false,

   getProfileInfoLoading: false,

   login: async (body, navigate) => {
      try {
         const res = await axios.post(`${API}/employee/login/`, body);
         localStorage.setItem('token', JSON.stringify(res.data));
         localStorage.setItem('email', JSON.stringify(body.email));
         set({ token: res.data });
         switch (res.data?.position) {
            case 'operator':
               navigate('/operator/home');
               break;
            case 'registrar':
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
         set({ errors: err });
         ShowMessage('error', 'Ошибка при входе на аккаунт');
      } finally {
      }
   },

   getProfileInfo: async (email) => {
      set({ getProfileInfoLoading: true });
      try {
         const res = await axios.get(`${API}/employee/retrieve`, {
            headers: {
               Authorization: `Bearer ${get().token.access}`,
            },
         });
         set({ employee: res.data });
      } catch (err) {
         set({ errors: err });
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
