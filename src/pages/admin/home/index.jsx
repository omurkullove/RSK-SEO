import { CustomLoading, ShowMessage, isAuthenticated } from '@/utils/utils';
import { Suspense, lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CalendarMain from '@/components/admin/Calendar';
import { LoadingOutlined } from '@ant-design/icons';
import MainLayout from '@/components/Main/Layout';
import Navbar from '@/components/admin/Navbar';
import { Spin } from 'antd';
import { adminIdentifier } from '@/api/synchronous';
import styles from '@/assets/styles/admin/Home.module.scss';
import { useGetProfileInfoQuery } from '@/api/general/auth_api';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

const EmployeeTable = lazy(() => import('@/components/admin/Employee/EmployeeTable'));
const Queue = lazy(() => import('@/components/admin/Queue'));
const Service = lazy(() => import('@/components/admin/ServiceAll'));
const Actions = lazy(() => import('@/components/admin/Actions'));
const Stats = lazy(() => import('@/components/admin/Stats'));
const Document = lazy(() => import('@/components/admin/Document'));
const LanguagesMain = lazy(() => import('@/components/admin/languagesMain'));
const Window = lazy(() => import('@/components/admin/Window'));
const Branch = lazy(() => import('@/components/admin/Branch'));
const Reports = lazy(() => import('@/components/admin/Reports'));
const Television = lazy(() => import('@/components/admin/TV'));
const DataBase = lazy(() => import('@/components/admin/DataBase'));

const HomePage = () => {
   const dispatch = useDispatch();

   const isSuperAdmin = useSelector((state) => state.toggleDarkMode.isSuperAdmin);

   const { data: employee, isLoading: isLoadingProfile } = useGetProfileInfoQuery();

   // Vanila states
   const [currentCard, setCurrentCard] = useState(1);

   const navigate = useNavigate();

   const { t } = useTranslation();
   const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   // list arrays
   const CARD_ITEMS = [
      {
         id: 1,
         title: t('admin.cards.EmployeeInfo'),
         isSuperAdminView: true,
      },
      {
         title: t('admin.cards.QueueInfo'),
         id: 2,
         isSuperAdminView: true,
      },
      {
         title: t('admin.cards.ServiceInfo'),
         id: 3,
         isSuperAdminView: true,
      },
      {
         title: t('admin.cards.ViewActions'),
         id: 4,
         isSuperAdminView: isSuperAdmin,
      },
      {
         title: t('admin.cards.Stats'),
         id: 5,
         isSuperAdminView: !isSuperAdmin,
      },
      {
         title: t('admin.cards.CreateDoc'),
         id: 6,
         isSuperAdminView: isSuperAdmin,
      },
      {
         title: t('admin.cards.docTranslate'),
         id: 7,
         isSuperAdminView: isSuperAdmin,
      },
      {
         title: t('admin.cards.createWindow'),
         id: 8,
         isSuperAdminView: !isSuperAdmin,
      },
      {
         title: t('buttons.createBranch'),
         id: 9,
         isSuperAdminView: isSuperAdmin,
      },
      {
         title: t('admin.cards.reports'),
         id: 10,
         isSuperAdminView: isSuperAdmin,
      },
      {
         title: t('admin.cards.ad'),

         id: 11,
         isSuperAdminView: isSuperAdmin,
      },
      {
         title: t('admin.cards.db'),
         id: 12,
         isSuperAdminView: isSuperAdmin,
      },
      {
         title: t('admin.cards.calendar'),
         id: 13,
         isSuperAdminView: isSuperAdmin,
      },
   ];

   useEffect(() => {
      if (!isAuthenticated()) {
         navigate('/');
      }
   }, []);

   useEffect(() => {
      dispatch(adminIdentifier());
   }, []);

   return isLoadingProfile ? (
      <div
         style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px',
         }}
      >
         <Spin indicator={antIcon} size='50' />
         <h4>{t('dataLoading')}</h4>
      </div>
   ) : (
      <MainLayout isSidebar={true} Navbar={<Navbar />}>
         <div className={styles.main}>
            <div className={styles.cardMainBlock}>
               {CARD_ITEMS.map((item) => (
                  <div
                     style={{
                        backgroundColor:
                           isDarkMode && currentCard === item.id
                              ? '#456792'
                              : isDarkMode && currentCard !== item.id
                              ? '#374B67'
                              : !isDarkMode && currentCard === item.id
                              ? '#EEFAFF'
                              : 'white',
                        display: !item?.isSuperAdminView && 'none',
                        color: isDarkMode ? 'white' : '',
                     }}
                     className={styles.card}
                     key={item.id}
                     onClick={() => setCurrentCard(item.id)}
                  >
                     {item.title}
                  </div>
               ))}
            </div>

            <div className={styles.contentBlock}>
               <Suspense fallback={<CustomLoading />}>
                  {currentCard === 1 && <EmployeeTable />}
                  {currentCard === 2 && <Queue />}
                  {currentCard === 3 && <Service />}
                  {currentCard === 4 && <Actions />}
                  {currentCard === 5 && <Stats />}
                  {currentCard === 6 && <Document />}
                  {currentCard === 7 && <LanguagesMain />}
                  {currentCard === 8 && <Window />}
                  {currentCard === 9 && <Branch />}
                  {currentCard === 10 && <Reports />}
                  {currentCard === 11 && <Television />}
                  {currentCard === 12 && <DataBase />}
                  {currentCard === 13 && <CalendarMain />}
               </Suspense>
            </div>
         </div>
      </MainLayout>
   );
};

export default HomePage;
