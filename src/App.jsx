import React from 'react';
import MainLayout from './mainComponents/Mainlayout/MainLayout';
import MainRouter from './mainRouter/MainRouter';

const App = () => {
  return (
    <main>
      <MainLayout>
        <MainRouter />
      </MainLayout>
    </main>
  );
};

export default App;
