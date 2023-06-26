import React from 'react'
import { Route, Routes } from 'react-router'
import AuthPage from '../auth'
import HomePage from './home'

const Root1_6 = () => {
   return (
      <Routes>
         <Route path='/home' element={<HomePage />} />
      </Routes>
   )
}

export default Root1_6
