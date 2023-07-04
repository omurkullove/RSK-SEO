import React from 'react';
import styles from '@/assets/styles/operator/Layout.module.scss';
import Sidebar from '../Sidebar';
import { Layout } from 'antd';
import { useOperator } from '@/services/operatorStore';

const MainLayout = ({ children, isSidebar, Navbar }) => {
   const isDarkMode = useOperator((state) => state.isDarkMode);

   return (
      <Layout hasSider>
         {isSidebar && (
            <div>
               <Sidebar />
            </div>
         )}
         <Layout
            style={{ backgroundColor: isDarkMode ? '#002A42' : '#F5F5F5', transition: '0.5s' }}
         >
            {Navbar}
            <Layout.Content>{children}</Layout.Content>
         </Layout>
      </Layout>
   );
};

export default MainLayout;
