import React from 'react';
import { Route, Routes } from 'react-router';
import Module_1_6 from '../modules/module_1_6/router/Module_1_6';

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/modules/1_6/*' element={<Module_1_6 />} />
      </Routes>
    </>
  );
};

export default MainRouter;
