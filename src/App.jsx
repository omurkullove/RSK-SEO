import React from 'react';
import MainLayout from './mainComponents/Mainlayout/MainLayout';
import MainRouter from './mainRouter/MainRouter';
import { ModalWindow } from './modules/module_1_7/components/ModalWindow';

const App = () => {
  return (
    <main>
      <MainLayout>
        <ModalWindow/>
        <MainRouter />
        
      </MainLayout>
    </main>
  );
};

export default App;
