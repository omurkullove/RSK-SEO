import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   isDarkMode: false,
   isSuperAdmin: false,
};

const synchronous = createSlice({
   name: 'toggle',
   initialState,
   reducers: {
      toggleDarkMode: (state, action) => {
         state.isDarkMode = action.payload;
      },
      adminIdentifier: (state) => {
         const admin = JSON.parse(localStorage.getItem('token'));
         switch (admin.position) {
            case 'admin':
               state.isSuperAdmin = false;
               break;
            case 'super_admin':
               state.isSuperAdmin = true;
               break;
            default:
               state.isSuperAdmin = false;
         }
         console.log('worked');
      },
   },
});
export const { toggleDarkMode, adminIdentifier } = synchronous.actions;

export default synchronous.reducer;
