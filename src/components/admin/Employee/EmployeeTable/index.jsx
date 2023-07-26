import { CustomLoading, branchIndeficator, cityTransalte, returnEmployee } from '@/utils/utils';

import CreateEmployeeModal from '../CreateEmployeeModal';
import EmployeeModal from '../EmployeeModal';
import { Table } from 'antd';
import styles from '../Employee.module.scss';
import { t } from 'i18next';
import { useGetBranchQuery } from '@/api/admin/branch_api';
import { useGetEmployeeListQuery } from '@/api/admin/employee_api';
import { useGetServiceQuery } from '@/api/admin/service_api';
import { useGetWindowQuery } from '@/api/admin/window_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const EmployeeTable = () => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [employee, setEmployee] = useState();
   const [isModal, setIsModal] = useState(false);
   const [isCreateEmpModal, setIsCreateEmpModal] = useState(false);

   const choosePerson = (email) => {
      setEmployee(returnEmployee(email, employeeList));
      setIsModal(true);
   };

   const { data: branchList, isLoading: isBranchListLoading } = useGetBranchQuery();
   const {
      data: employeeList,
      isLoading: isEmployeeListLoading,
      refetch,
   } = useGetEmployeeListQuery();
   const { data: windowList, isLoading: isWindowListLoading } = useGetWindowQuery();
   const { data: serviceList, isLoading: isServiceListLoading } = useGetServiceQuery();

   const columns = [
      {
         dataIndex: 'username',
         title: (
            <p className={`${styles.tableTitle} ${isDarkMode ? styles.darkModeText : ''}`}>
               {t('admin.table.FullName')}
            </p>
         ),
         render: (value) => (
            <p
               className={`${styles.tableData} ${isDarkMode ? styles.darkModeText : ''}`}
               style={{ textAlign: 'start' }}
            >
               {value}
            </p>
         ),
         sorter: (a, b) => a.username.localeCompare(b.username, 'ru'),
         sortDirections: ['ascend'],
         defaultSortOrder: 'ascend',
      },
      {
         dataIndex: 'email',
         title: (
            <p className={`${styles.tableTitle} ${isDarkMode ? styles.darkModeText : ''}`}>
               {t('admin.table.Email')}
            </p>
         ),
         render: (value) => (
            <p
               className={`${`${styles.tableData} ${isDarkMode ? styles.darkModeText : ''}`} ${
                  styles.email
               } `}
               onClick={() => choosePerson(value)}
            >
               {value}
            </p>
         ),
      },
      {
         dataIndex: 'branch',
         title: (
            <p className={`${styles.tableTitle} ${isDarkMode ? styles.darkModeText : ''}`}>
               {t('admin.table.branch')}
            </p>
         ),
         render: (value) => (
            <p className={`${styles.tableData} ${isDarkMode ? styles.darkModeText : ''}`}>
               {branchIndeficator(branchList, value)}
            </p>
         ),
         filters: branchList?.map((item) => ({
            text: `${cityTransalte(item?.city)}, ${item.address}`,
            value: item.id,
         })),

         onFilter: (value, record) => record.branch === value,
      },
      {
         dataIndex: 'shift',
         title: (
            <p className={`${styles.tableTitle} ${isDarkMode ? styles.darkModeText : ''}`}>
               {t('admin.table.workTime')}
            </p>
         ),
         render: (value) => (
            <p className={`${styles.tableData} ${isDarkMode ? styles.darkModeText : ''}`}>
               {value}
            </p>
         ),
      },
   ];

   return isBranchListLoading &&
      isEmployeeListLoading &&
      isWindowListLoading &&
      isServiceListLoading ? (
      <CustomLoading />
   ) : (
      <div className={styles.tableBlock}>
         <Table
            className={isDarkMode ? 'dark_mode' : 'default_mode'}
            loading={isEmployeeListLoading}
            dataSource={employeeList?.map((item, index) => ({
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
                  {t('admin.table.allEmployees')}
               </p>
            )}
         />
         {isModal && (
            <EmployeeModal
               employee={employee}
               setIsModal={setIsModal}
               isModal={isModal}
               windowList={windowList}
               branchList={branchList}
               serviceList={serviceList}
               refetch={refetch}
            />
         )}
         {isCreateEmpModal && (
            <CreateEmployeeModal
               setIsCreateEmpModal={setIsCreateEmpModal}
               isCreateEmpModal={isCreateEmpModal}
               windowList={windowList}
               branchList={branchList}
               serviceList={serviceList}
               refetch={refetch}
            />
         )}
         <div className={styles.buttonBlock}>
            <button onClick={() => setIsCreateEmpModal(true)}>{t('buttons.createEmployee')}</button>
         </div>
      </div>
   );
};

export default EmployeeTable;
