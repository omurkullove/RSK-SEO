import { Route, Routes } from 'react-router';

import OperatorHome from './home';
import React from 'react';

const RootOpertor = () => {
   return (
      <Routes>
         <Route path='/home/' element={<OperatorHome />} />
      </Routes>
   );
};

export default RootOpertor;
