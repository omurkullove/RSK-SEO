import React from 'react';

import { Route, Routes } from 'react-router';

import AuthPage from '@/pages/auth';

import RootRegistrar from '@/pages/registrar';
import RootOpertor from '@/pages/operator';

const MainRouter = () => {
   return (
      <Routes>
         <Route path='/' element={<AuthPage />} />
         <Route path='/operator/*' element={<RootOpertor />} />
         <Route path='/registrar/*' element={<RootRegistrar />} />
      </Routes>
   );
};

export default MainRouter;
