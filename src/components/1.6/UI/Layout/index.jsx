import React from 'react';
import styles from '@/assets/styles/1.6/Layout.module.scss';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { Layout } from 'antd';

const MainLayout = ({ children }) => {
   return (
      <Layout hasSider>
         <div>
            <Sidebar />
         </div>
         <Layout>
            <Navbar />
            <Layout.Content>{children}</Layout.Content>
         </Layout>
      </Layout>
   );
};

export default MainLayout;
