import React from 'react';

import { Route, Routes } from 'react-router';

import AuthPage from '@/pages/auth';
import Root1_6 from '@/pages/module1_6';
import Root1_7 from '@/pages/module1_7';

const MainRouter = () => {

  return (
    <Routes>
      <Route path='/' element={<AuthPage />} />
      <Route path='/1_6/*' element={<Root1_6 />} />
      <Route path='/1_7/*' element={<Root1_7 />} />
    </Routes>
  );

};

export default MainRouter;
