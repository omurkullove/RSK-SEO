import React from 'react';
import MainRouter from './router/MainRouter';

import i18n from './i18next';
import { I18nextProvider } from 'react-i18next';
const App = () => {
   return (
      <I18nextProvider i18n={i18n}>
         <MainRouter />
      </I18nextProvider>
   );
};


export default App;
