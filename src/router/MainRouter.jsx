import { Route, Routes } from 'react-router';

import AuthPage from '@/pages/auth';
import React from 'react';
import RootAdmin from '@/pages/admin';
import RootOpertor from '@/pages/operator';
import RootRegistrar from '@/pages/registrar';

const MainRouter = () => {
   return (
      <Routes>
         <Route path='/' element={<AuthPage />} />
         <Route path='/operator/*' element={<RootOpertor />} />
         <Route path='/registrar/*' element={<RootRegistrar />} />
         <Route path='/admin/*' element={<RootAdmin />} />
         <Route path='*' element={<p>404 not found</p>} />
      </Routes>
   );
};

export default MainRouter;
