import { useMain } from '@/services/MainStore';
import { useAdmin } from '@/services/adminStore';
import React, { useState } from 'react';
import styles from '../Employee.module.scss';
import { CustomLoading, antIcon, returnEmployee } from '@/utils/utils';
import { Spin, Table } from 'antd';
import EmployeeModal from '../EmployeeModal';
import CreateEmployeeModal from '../CreateEmployeeModal';

const EmployeeTable = () => {
   const isDarkMode = useMain((state) => state.isDarkMode);
   const isEmployeeListLoading = useAdmin((state) => state.isEmployeeListLoading);
   const employeeList = useAdmin((state) => state.employeeList);

   const [employee, setEmployee] = useState();
   const [isModal, setIsModal] = useState(false);
   const [isCreateEmpModal, setIsCreateEmpModal] = useState(false);

   const choosePerson = (email) => {
      setEmployee(returnEmployee(email, employeeList));
      setIsModal(true);
   };

   const columns = [
      {
         dataIndex: 'username',
         title: <p className={styles.tableTitle}>ФИО</p>,
         render: (value) => <p className={styles.tableData}>{value}</p>,
         sorter: (a, b) => a.username.localeCompare(b.username, 'ru'),
         sortDirections: ['ascend'],
         defaultSortOrder: 'ascend',
      },
      {
         dataIndex: 'email',
         title: <p className={styles.tableTitle}>Почта</p>,
         render: (value) => (
            <p
               className={`${styles.tableData} ${styles.email} `}
               onClick={() => choosePerson(value)}
            >
               {value}
            </p>
         ),
      },
      {
         dataIndex: 'branch',
         title: <p className={styles.tableTitle}>Филиал</p>,
         render: (value) => (
            <p className={styles.tableData}>{typeof value === 'undefined' ? '-' : value}</p>
         ),
      },
      {
         dataIndex: 'shift',
         title: <p className={styles.tableTitle}>Время работы</p>,
         render: (value) => <p className={styles.tableData}>{value}</p>,
      },
   ];

   return isEmployeeListLoading ? (
      <CustomLoading />
   ) : (
      <div className={styles.tableBlock}>
         <Table
            className={isDarkMode ? 'dark_mode' : 'default_mode'}
            loading={isEmployeeListLoading}
            dataSource={employeeList.map((item, index) => ({
               ...item,
               key: index,
            }))}
            columns={columns}
            scroll={{ x: 1300 }}
            title={() => (
               <p
                  style={{
                     fontFamily: "'Inter', sanf-serif",
                     color: isDarkMode ? 'white' : '#2B2B2B',
                     fontSize: '18px',
                     fontWeight: '600',
                  }}
               >
                  {/* {t('table.titles.allTalons')} */}
                  Все сотрудники
               </p>
            )}
         />
         {isModal && (
            <EmployeeModal employee={employee} setIsModal={setIsModal} isModal={isModal} />
         )}
         {isCreateEmpModal && (
            <CreateEmployeeModal
               setIsCreateEmpModal={setIsCreateEmpModal}
               isCreateEmpModal={isCreateEmpModal}
            />
         )}
         <div className={styles.buttonBlock}>
            <button onClick={() => setIsCreateEmpModal(true)}>Создать сотрудника</button>
         </div>
      </div>
   );
};

export default EmployeeTable;
