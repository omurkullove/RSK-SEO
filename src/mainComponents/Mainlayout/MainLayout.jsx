import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainLayout = ({ children }) => {
  return (
    <main>
      <nav>
        <Header />
      </nav>
      <section>{children}</section>
      <footer>
        <Footer />
      </footer>
    </main>
  );
};

export default MainLayout;
