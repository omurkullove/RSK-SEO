import { Route, Routes } from 'react-router';

import HomePage from './home';
import NotFound404 from '../NotFound404/NotFound404';
import React from 'react';

const RootOpertor = () => {
   const token = JSON.parse(localStorage.getItem('token'));

   return (
      <Routes>
         <Route path={`/home/`} element={<HomePage />} />
         <Route path='/home/*' element={<NotFound404 />} />
      </Routes>
   );
};

export default RootOpertor;
