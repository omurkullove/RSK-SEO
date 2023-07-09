import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from './home';

const RootAdmin = () => {
   return (
      <Routes>
         <Route path='/home/*' element={<HomePage />} />
      </Routes>
   );
};

export default RootAdmin;
