import { CustomLoading, ShowMessage, isDarkModeTrigger } from '@/utils/utils';

import Chart from './Chart';
import { DatePicker } from 'antd';
import STable from './STable';
import styles from './Stats.module.scss';
import { t } from 'i18next';
import { useGetStatMutation } from '@/api/admin/report_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Stats = () => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [getStats, { data: stats, isLoading: isStatsLoading }] = useGetStatMutation();

   const [format, setFormat] = useState(1);

   const [period, setPeriod] = useState();

   const onChange = (name, value) => {
      setPeriod((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleGetStats = async () => {
      if (!period?.start_time || !period?.end_time) {
         ShowMessage('warning', 'Выберите период');
         return;
      }

      await getStats(period);
   };

   const selectStlye = {
      borderBottom: '2px solid var(--unnamed, #0E3584)',
      background: isDarkMode
         ? 'linear-gradient(180deg, rgba(55, 75, 103, 1) 0%, rgba(225, 247, 254, 0.00) 97.40%)'
         : 'linear-gradient(180deg, rgba(225, 247, 254, 0.00) 0%, #E1F7FE 97.40%)',
      color: isDarkMode ? 'lightblue' : 'var(--unnamed, #0e3584)',
   };

   return (
      <div className={styles.statsBlock} style={{ backgroundColor: isDarkMode ? '#001F31' : '' }}>
         <div className={styles.header}>
            <h1 style={isDarkModeTrigger(1, false, isDarkMode)}>{t('admin.statsMain.period')}</h1>
            <div className={styles.dateBlock}>
               <label style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {t('admin.statsMain.start')}:
                  <span>
                     <DatePicker
                        style={{
                           background: 'transparent',
                        }}
                        onChange={(_, value) => onChange('start_time', value)}
                     />
                  </span>
               </label>
               <label style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {t('admin.statsMain.end')}:
                  <DatePicker
                     style={{ background: 'transparent' }}
                     onChange={(_, value) => onChange('end_time', value)}
                  />
               </label>
            </div>
            <button className={styles.getStats} onClick={() => handleGetStats()}>
               {t('admin.statsMain.form')}
            </button>
         </div>

         <div className={styles.body}>
            <div style={format === 1 ? selectStlye : {}}>
               <p onClick={() => setFormat(1)}>{t('admin.statsMain.table')}</p>
            </div>
            <div style={format === 2 ? selectStlye : {}}>
               <p onClick={() => setFormat(2)}>{t('admin.statsMain.chart')}</p>
            </div>
         </div>

         {isStatsLoading ? (
            <CustomLoading />
         ) : (
            <div className={styles.content}>
               {format === 1 && <STable stats={stats} isStatsLoading={isStatsLoading} />}
               {format === 2 && <Chart stats={stats} />}
            </div>
         )}
      </div>
   );
};

export default Stats;
