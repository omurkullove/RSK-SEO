import React from 'react';
import styles from '@/assets/styles/operator/Layout.module.scss';
import Sidebar from '../Sidebar';
import { Layout } from 'antd';
import { useOperator } from '@/services/operatorStore';
import { useMain } from '@/services/MainStore';

const MainLayout = ({ children, isSidebar, Navbar }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);

   return (
      <Layout hasSider>
         {isSidebar && (
            <div>
               <Sidebar />
            </div>
         )}
         <Layout
            style={{
               backgroundColor: isDarkMode ? '#002A42' : '#F5F5F5',
               transition: '0.5s',
               minHeight: '100vh',
            }}
         >
            {Navbar}
            <Layout.Content>{children}</Layout.Content>
         </Layout>
      </Layout>
   );
};

export default MainLayout;
