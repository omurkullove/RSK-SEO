import MainLayout from '@/components/operator/UI/Layout';
import React, { useEffect, useState } from 'react';
import styles from '@/assets/styles/admin/Home.module.scss';
import Navbar from '@/components/admin/Navbar';
import { useMain } from '@/services/MainStore';
import {
   ShowMessage,
   branchIndeficator,
   returnEmployee,
   serviceIndetificator,
} from '@/utils/utils';
import { Spin, Table } from 'antd';
import { useAdmin } from '@/services/adminStore';
import { LoadingOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
// import EmployeeModal from '@/components/admin/Employee/EmployeeModal';
// import QueueModal from '@/components/admin/QueueModal';
// import CreateQueueModal from '@/components/admin/createQueueModal';
// import CreateServiceModal from '@/components/admin/CreateServiceModal';
// import ServiceModal from '@/components/admin/serviceModal';
import { useNavigate } from 'react-router';
import EmployeeTable from '@/components/admin/Employee/EmployeeTable';
import Queue from '@/components/admin/Queue';
import Service from '@/components/admin/ServiceAll';
import Document from '@/components/admin/Document';

const HomePage = () => {
   // store
   const employee = useMain((state) => state.employee);
   const getProfileInfoLoading = useMain((state) => state.getProfileInfoLoading);
   const getProfileInfo = useMain((state) => state.getProfileInfo);
   const isDarkMode = useMain((state) => state.isDarkMode);
   const employeeList = useAdmin((state) => state.employeeList);
   const getEmployeeList = useAdmin((state) => state.getEmployeeList);
   const isEmployeeListLoading = useAdmin((state) => state.isEmployeeListLoading);

   const adminIdentifier = useMain((state) => state.adminIdentifier);
   const isSuperAdmin = useMain((state) => state.isSuperAdmin);

   // Vanila states
   const [isEmpModal, setIsEmpModal] = useState(false);

   const [choosedEployee, setChoosedEmployee] = useState();
   const [choosedQueue, setChoosedQueue] = useState();
   const [currentCard, setCurrentCard] = useState(1);
   const [choosedService, setChoosedService] = useState();

   const navigate = useNavigate();

   const { t } = useTranslation();
   const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

   // list arrays
   const CARD_ITEMS = [
      {
         id: 1,
         title: 'Информация о сотрудниках',
         isSuperAdminView: true,
      },
      {
         id: 2,
         title: 'Информация об очередях',
         isSuperAdminView: true,
      },
      {
         id: 3,
         title: 'Информация об услугах',
         isSuperAdminView: true,
      },
      {
         id: 4,
         title: 'Просмотр действий',
         isSuperAdminView: isSuperAdmin,
      },
      {
         id: 5,
         title: 'Статистика',
         isSuperAdminView: isSuperAdmin,
      },
      {
         id: 6,
         title: 'Создать документ',
         isSuperAdminView: isSuperAdmin,
      },
   ];

   useEffect(() => {
      if (employee && JSON.parse(localStorage.getItem('token'))) {
         ShowMessage('success', 'Вы успешно зашли на аккаунт');
      } else {
         navigate('/');
      }
   }, []);

   useEffect(() => {
      getProfileInfo(JSON.parse(localStorage.getItem('email')));
      getEmployeeList(JSON.parse(localStorage.getItem('token')));
      adminIdentifier();
   }, []);

   // useEffect(() => {
   //    getQueueList(JSON.parse(localStorage.getItem('token')));
   // }, []);

   return getProfileInfoLoading && isEmployeeListLoading ? (
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
         <h4>Идет подсчет данных....</h4>
      </div>
   ) : (
      <MainLayout isSidebar={true} Navbar={<Navbar employee={employee} />}>
         <div className={styles.main}>
            <div className={styles.cardMainBlock}>
               {CARD_ITEMS.map((item) => (
                  <div
                     style={{
                        backgroundColor: currentCard === item.id ? '#EEFAFF' : '',
                        display: !item?.isSuperAdminView && 'none',
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
               {currentCard === 1 && <EmployeeTable />}
               {currentCard === 2 && <Queue />}
               {currentCard === 3 && <Service />}
               {currentCard === 6 && <Document />}
            </div>
         </div>
      </MainLayout>
   );
};

export default HomePage;
