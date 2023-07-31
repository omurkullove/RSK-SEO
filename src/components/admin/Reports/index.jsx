import {
   CustomLoading,
   branchIndeficator,
   cityTransalte,
   employeeIdetificator,
   isDarkModeTrigger,
   returnUnderstandableDate,
} from '@/utils/utils';
import { useEffect, useState } from 'react';

import styles from './Reports.module.scss';
import { t } from 'i18next';
import { useGetBranchListQuery } from '@/api/registrar/registrar_api';
import { useGetEmployeeListQuery } from '@/api/admin/employee_api';
import { useGetReportQuery } from '@/api/admin/report_api';
import { useSelector } from 'react-redux';

const Reports = () => {
   const { data: reports, isLoading: isReportsLoading } = useGetReportQuery();

   const { data: branchList, isLoading: isBranchListLoading } = useGetBranchListQuery();

   const [filteredReports, setFilteredReports] = useState(reports);

   const { data: employeeList, isLoading: isEmployeeListLoading } = useGetEmployeeListQuery();

   const [currentBranch, setCurrentBranch] = useState('all');

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const handleFilter = (branchId) => {
      setCurrentBranch(branchId);
      if (branchId === 'all') {
         setFilteredReports(reports);
      } else {
         setFilteredReports(reports.filter((item) => item.branch.id === branchId));
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

   const fileCutter = (url) => {
      if (url) {
         const result = url.substring(url.lastIndexOf('/media/') + '/media/'.length);
         return result;
      }
      return;
   };

   return (
      <div className={styles.main}>
         <h1>{t('admin.reports.reports')}</h1>
         {isReportsLoading && isBranchListLoading ? (
            <CustomLoading />
         ) : reports?.length ? (
            <>
               <input
                  placeholder={t('admin.reports.reports_search')}
                  onChange={(e) => handleSearch(e.target.value)}
               />
               <div className={styles.buttonBlock}>
                  <button
                     onClick={() => handleFilter('all')}
                     style={{ backgroundColor: currentBranch === 'all' ? '#2f78df' : '' }}
                  >
                     {t('admin.reports.all')}
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
                        <div
                           key={report?.id}
                           className={styles.reportItem}
                           style={isDarkModeTrigger(1, true, isDarkMode)}
                        >
                           <div className={styles.title}>
                              {`${report.branch.city}, ${report.branch.address}`}
                           </div>
                           <div className={styles.info}>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>ID:</span>
                                 <span
                                    className={styles.value}
                                    style={isDarkModeTrigger(1, false, isDarkMode)}
                                 >
                                    {report.id}
                                 </span>
                              </div>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>PDF:</span>
                                 <a
                                    href={report.pdf_file}
                                    target='_blank'
                                    className={styles.value}
                                    style={isDarkModeTrigger(1, false, isDarkMode)}
                                 >
                                    {fileCutter(report.pdf_file)}
                                 </a>
                              </div>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>Excel:</span>
                                 <a
                                    href={report.exel_file}
                                    target='_blank'
                                    className={styles.value}
                                    style={isDarkModeTrigger(1, false, isDarkMode)}
                                 >
                                    {fileCutter(report.exel_file)}
                                 </a>
                              </div>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>
                                    {t('admin.reports.registered_at')}:
                                 </span>
                                 <span
                                    className={styles.value}
                                    style={isDarkModeTrigger(1, false, isDarkMode)}
                                 >
                                    {returnUnderstandableDate(report?.registration_date, false)}
                                 </span>
                              </div>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>{t('admin.reports.branch')}:</span>
                                 <span
                                    className={styles.value}
                                    style={isDarkModeTrigger(1, false, isDarkMode)}
                                 >
                                    {`${report.branch.city}, ${report.branch.address}`}
                                 </span>
                              </div>
                              <div className={styles.infoItem}>
                                 <span className={styles.label}>
                                    {t('admin.reports.employee')}:
                                 </span>
                                 <span
                                    className={styles.value}
                                    style={isDarkModeTrigger(1, false, isDarkMode)}
                                 >
                                    {report?.author}
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
