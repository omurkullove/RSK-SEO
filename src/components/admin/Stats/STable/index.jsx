import { isDarkModeTrigger, monthTranslate } from '@/utils/utils';

import { Table } from 'antd';
import styles from '../Stats.module.scss';
import { t } from 'i18next';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

const STable = ({ stats, isStatsLoading }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const monthsMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
   };
   const tableFilterMonth = [
      { text: t('chart.January'), value: 'January' },
      { text: t('chart.February'), value: 'February' },
      { text: t('chart.March'), value: 'March' },
      { text: t('chart.April'), value: 'April' },
      { text: t('chart.May'), value: 'May' },
      { text: t('chart.June'), value: 'June' },
      { text: t('chart.July'), value: 'July' },
      { text: t('chart.August'), value: 'August' },
      { text: t('chart.September'), value: 'September' },
      { text: t('chart.October'), value: 'October' },
      { text: t('chart.November'), value: 'November' },
      { text: t('chart.December'), value: 'December' },
   ];
   const monthsMapExel = {
      January: 'January',
      February: 'February',
      March: 'March',
      April: 'April',
      May: 'May',
      June: 'June',
      July: 'July',
      August: 'August',
      September: 'September',
      October: 'October',
      November: 'November',
      December: 'December',
   };

   const column = [
      {
         title: (
            <p className={styles.columnTitle} style={isDarkModeTrigger(3, false, isDarkMode)}>
               {t('chart.month')}
            </p>
         ),
         dataIndex: 'month',
         render: (value, talon) => (
            <div>
               <p className={styles.columnData} style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {monthTranslate(value)}
               </p>
            </div>
         ),
         filters: tableFilterMonth,
         sorter: (a, b) => monthsMap[a.month] - monthsMap[b.month],
         onFilter: (value, record) => record.month === value,
      },
      {
         title: (
            <p className={styles.columnTitle} style={isDarkModeTrigger(3, false, isDarkMode)}>
               {t('chart.talon_canceled')}
            </p>
         ),
         dataIndex: 'talon_canceled',
         render: (value, talon) => (
            <div>
               <p className={styles.columnData} style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {value}
               </p>
            </div>
         ),
         sorter: (a, b) => a.talon_canceled - b.talon_canceled,
      },

      {
         title: (
            <p className={styles.columnTitle} style={isDarkModeTrigger(3, false, isDarkMode)}>
               {t('chart.talon_completed')}
            </p>
         ),
         dataIndex: 'talon_completed',
         render: (value, talon) => (
            <div>
               <p className={styles.columnData} style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {value}
               </p>
            </div>
         ),
         sorter: (a, b) => a.talon_completed - b.talon_completed,
      },

      {
         title: (
            <p className={styles.columnTitle} style={isDarkModeTrigger(3, false, isDarkMode)}>
               {t('chart.talon_count')}
            </p>
         ),
         dataIndex: 'talon_count',
         render: (value, talon) => (
            <div>
               <p className={styles.columnData} style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {value}
               </p>
            </div>
         ),
         sorter: (a, b) => a.talon_count - b.talon_count,
      },
   ];
   const data = [
      {
         month: 'Январь',
         talon_count: 30,
         talon_canceled: 10,
         talon_completed: 20,
      },
      {
         month: 'Февраль',
         talon_count: 25,
         talon_canceled: 8,
         talon_completed: 17,
      },
      {
         month: 'Март',
         talon_count: 28,
         talon_canceled: 12,
         talon_completed: 16,
      },
      {
         month: 'Апрель',
         talon_count: 35,
         talon_canceled: 15,
         talon_completed: 20,
      },
      {
         month: 'Май',
         talon_count: 29,
         talon_canceled: 9,
         talon_completed: 20,
      },
      {
         month: 'Июнь',
         talon_count: 27,
         talon_canceled: 7,
         talon_completed: 20,
      },
      {
         month: 'Июль',
         talon_count: 33,
         talon_canceled: 11,
         talon_completed: 22,
      },
      {
         month: 'Август',
         talon_count: 32,
         talon_canceled: 10,
         talon_completed: 22,
      },
      {
         month: 'Сентябрь',
         talon_count: 31,
         talon_canceled: 11,
         talon_completed: 20,
      },
      {
         month: 'Октябрь',
         talon_count: 27,
         talon_canceled: 9,
         talon_completed: 18,
      },
      {
         month: 'Ноябрь',
         talon_count: 30,
         talon_canceled: 12,
         talon_completed: 18,
      },
      {
         month: 'Декабрь',
         talon_count: 31,
         talon_canceled: 10,
         talon_completed: 21,
      },
   ];

   // Exel
   const tableRef = useRef();

   const exportToExcel = () => {
      const table = tableRef.current;
      const html = table.outerHTML;
      const url = 'data:application/vnd.ms-excel,' + encodeURIComponent(html);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'report.xls';
      link.click();
   };

   return (
      <>
         <div className={styles.tabel}>
            <button onClick={exportToExcel}>{t('chart.saveAsExel')}</button>
         </div>
         <Table
            style={{
               marginBottom: '50px',
            }}
            className={isDarkMode ? 'dark_mode' : 'default_mode'}
            loading={isStatsLoading}
            dataSource={stats?.month?.map((item, index) => ({
               ...item,
               key: index,
            }))}
            columns={column}
            scroll={{ x: 1300 }}
            title={() => (
               <p
                  style={{
                     fontFamily: "'Inter', sanf-serif",
                     fontSize: '18px',
                     fontWeight: '600',
                     color: isDarkMode ? 'white' : '#2B2B2B',
                  }}
               >
                  {t('admin.cards.Stats')}
               </p>
            )}
         />

         {/* Tabel to export  */}

         <div style={{ display: 'none' }}>
            <table ref={tableRef}>
               <thead>
                  <tr>
                     <th>{t('chart.month')}</th>
                     <th>{t('chart.talon_count')}</th>
                     <th>{t('chart.talon_canceled')}</th>
                     <th>{t('chart.talon_completed')}</th>
                  </tr>
               </thead>
               <tbody>
                  {stats?.month?.map((item, index) => (
                     <tr key={index}>
                        <td>{monthTranslate(monthsMapExel[item.month])}</td>
                        <td>{item.talon_count}</td>
                        <td>{item.talon_canceled}</td>
                        <td>{item.talon_completed}</td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </>
   );
};

export default STable;
