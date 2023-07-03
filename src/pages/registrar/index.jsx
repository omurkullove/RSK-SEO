import React from 'react';
import { Route, Routes } from 'react-router';
import RegistrarHome from './home';

const RootRegistrar = () => {
   return (
      <Routes>
         <Route path='/home' element={<RegistrarHome />} />
      </Routes>
   );
};

export default RootRegistrar;
