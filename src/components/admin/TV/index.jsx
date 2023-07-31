import {
   useCreateAdMutation,
   useGetAdQuery,
   useGetRunnigLineQuery,
   useRemoveAdMutation,
} from '@/api/admin/tvConfig_api';

import { Ad } from './ad';
import RunnigLine from './RunnigLine';
import styles from './TV.module.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Television = () => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [adMode, setAdMode] = useState('ad');

   return (
      <div className={styles.tvBlock} style={{ backgroundColor: isDarkMode ? '#001F31' : '' }}>
         <div className={styles.head}>
            <p style={{ color: isDarkMode ? 'white' : '' }}>{t('admin.tv.settings')}</p>
         </div>
         <div className={styles.modeBlock}>
            <button
               style={{
                  backgroundColor: adMode === 'ad' ? 'cadetblue' : '',
               }}
               onClick={() => setAdMode('ad')}
            >
               {t('admin.tv.ad')}
            </button>
            <button
               onClick={() => setAdMode('line')}
               style={{
                  backgroundColor: adMode === 'line' ? 'cadetblue' : '',
               }}
            >
               {t('admin.tv.runnigLine')}
            </button>
         </div>
         <div className={styles.body}>
            {adMode === 'ad' && <Ad />} {adMode === 'line' && <RunnigLine />}
         </div>
      </div>
   );
};

export default Television;
