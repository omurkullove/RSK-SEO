import { Layout } from 'antd';
import Sidebar from '../Sidebar';
import { useSelector } from 'react-redux';

const MainLayout = ({ children, isSidebar, Navbar }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

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
