import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from '../pages/HomePage/HomePage';

const Module_1_6 = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default Module_1_6;
