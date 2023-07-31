import { Route, Routes } from 'react-router';

import NotFound404 from '../NotFound404/NotFound404';
import React from 'react';
import RegistrarHome from './home';

const RootRegistrar = () => {
   return (
      <Routes>
         <Route path='/home' element={<RegistrarHome />} />
         <Route path='*' element={<NotFound404 />} />
      </Routes>
   );
};

export default RootRegistrar;
