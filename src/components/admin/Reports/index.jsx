import {
   CustomLoading,
   branchIndeficator,
   cityTransalte,
   employeeIdetificator,
} from '@/utils/utils';
import { useEffect, useState } from 'react';

import styles from './Reports.module.scss';
import { t } from 'i18next';
import { useGetBranchListQuery } from '@/api/registrar/registrar_api';
import { useGetEmployeeListQuery } from '@/api/admin/employee_api';
import { useGetReportQuery } from '@/api/admin/report_api';

const reports = [
   {
      id: 1,
      pdf_file: 'fake_uri_1.pdf',
      exel_file: 'fake_uri_1.xlsx',
      registration_date: '2023-07-23T12:34:56',
      title: 'Report 1',
      branch: 1,
      user: 10,
   },
   {
      id: 2,
      pdf_file: 'fake_uri_2.pdf',
      exel_file: 'fake_uri_2.xlsx',
      registration_date: '2023-07-24T10:20:30',
      branch: 2,
      user: 11,
   },
];

const Reports = () => {
   const { data: reports, isLoading: isReportsLoading } = useGetReportQuery();

   const { data: branchList, isLoading: isBranchListLoading } = useGetBranchListQuery();

   const [filteredReports, setFilteredReports] = useState(reports);

   const { data: employeeList, isLoading: isEmployeeListLoading } = useGetEmployeeListQuery();

   const [currentBranch, setCurrentBranch] = useState('all');

   const handleFilter = (branchId) => {
      setCurrentBranch(branchId);
      if (branchId === 'all') {
         setFilteredReports(reports);
      } else {
         setFilteredReports(reports.filter((item) => item.branch === branchId));
      }
   };

   const handleSearch = (value) => {
      if (value === '') {
         if (currentBranch === 'all') {
            setFilteredReports(reports);
         } else {
            const filteredValue = reports.filter((item) => item.branch === currentBranch);
            setFilteredReports(filteredValue);
         }
      } else {
         const searchValue = value.trim().toLowerCase().toString();
         if (currentBranch === 'all') {
            const filteredValue = reports.filter((item) =>
               item.id.toString().includes(searchValue)
            );
            setFilteredReports(filteredValue);
         } else {
            const filteredValue = reports.filter(
               (item) => item.id.toString().includes(searchValue) && item.branch === currentBranch
            );
            setFilteredReports(filteredValue);
         }
      }
   };

   useEffect(() => {
      setFilteredReports(reports);
   }, [reports]);

   return (
      <div className={styles.main}>
         <h1>Отчеты</h1>
         {isReportsLoading && isBranchListLoading ? (
            <CustomLoading />
         ) : reports?.length ? (
            <>
               <input
                  placeholder='Поиск по отчетам...'
                  onChange={(e) => handleSearch(e.target.value)}
               />
               <div className={styles.buttonBlock}>
                  <button
                     onClick={() => handleFilter('all')}
                     style={{ backgroundColor: currentBranch === 'all' ? '#2f78df' : '' }}
                  >
                     Все
                  </button>
                  {branchList?.map((item) => (
                     <button
                        onClick={() => handleFilter(item?.id)}
                        style={{ backgroundColor: currentBranch === item.id ? '#2f78df' : '' }}
                     >{`${cityTransalte(item?.city)}, ${item?.address}`}</button>
                  ))}
               </div>
               <div className={styles.reportsList}>
                  {filteredReports?.map((report) => (
                     <>
                        <div className={styles.reportItem}>
                           <div className={styles.title}>
                              {branchIndeficator(branchList, report.branch)}
                           </div>
                           <div className={styles.info}>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>ID:</span>
                                 <span className={styles.value}>{report.id}</span>
                              </div>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>PDF file:</span>
                                 <span className={styles.value}>{report.pdf_file}</span>
                              </div>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>Excel file:</span>
                                 <span className={styles.value}>{report.exel_file}</span>
                              </div>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>Registration date:</span>
                                 <span className={styles.value}>{report.registration_date}</span>
                              </div>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>Branch:</span>
                                 <span className={styles.value}>
                                    {branchIndeficator(branchList, report.branch)}
                                 </span>
                              </div>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>User:</span>
                                 <span className={styles.value}>
                                    {employeeIdetificator(employeeList, report.user)}
                                 </span>
                              </div>
                           </div>
                        </div>
                     </>
                  ))}
               </div>
            </>
         ) : (
            <>
               <h1 style={{ marginTop: '50px' }}>{`${t('noData')}`}</h1>
            </>
         )}
      </div>
   );
};

export default Reports;
