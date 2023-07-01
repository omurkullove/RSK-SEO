import React from 'react';
import styles from '@/assets/styles/operator/Layout.module.scss';
import Sidebar from '../Sidebar';
import { Layout } from 'antd';

const MainLayout = ({ children, isSidebar, Navbar }) => {
   return (
      <Layout hasSider>
         {isSidebar && (
            <div>
               <Sidebar />
            </div>
         )}
         <Layout>
            {Navbar}
            <Layout.Content>{children}</Layout.Content>
         </Layout>
      </Layout>
   );
};

export default MainLayout;
