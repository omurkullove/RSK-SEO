import { Route, Routes } from 'react-router';

import HomePage from './home';
import React from 'react';

const RootAdmin = () => {
   return (
      <Routes>
         <Route path='/home/*' element={<HomePage />} />
      </Routes>
   );
};

export default RootAdmin;
