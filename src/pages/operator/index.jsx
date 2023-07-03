import React from 'react';
import { Route, Routes } from 'react-router';

import OperatorHome from './home';

const RootOpertor = () => {
   return (
      <Routes>
         <Route path='/home' element={<OperatorHome />} />
      </Routes>
   );
};

export default RootOpertor;
