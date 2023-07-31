import { CustomLoading, isDarkModeTrigger } from '@/utils/utils';
import React, { useState } from 'react';
import { useGetBackupQuery, usePostBackupMutation, useRestoreMutation } from '@/api/admin/db_api';

import DbModal from './DbModal';
import copySVG from '@/assets/svg/dbRefresh.svg';
import refreshSVG from '@/assets/svg/dbCopy.svg';
import styles from './DataBase.module.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

const DataBase = () => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const { data: buckups, isLoading: isBackupLoading } = useGetBackupQuery();

   const [modal, setModal] = useState(false);
   const [restore] = useRestoreMutation();
   const [postBackup] = usePostBackupMutation();

   const handlePostBackup = async () => {
      await postBackup();
   };

   return (
      <div className={styles.dbBlock} style={{ backgroundColor: isDarkMode ? '#001F31' : '' }}>
         <div className={styles.head}>
            <p style={{ color: isDarkMode ? 'white' : '' }}>{t('admin.db.db')}</p>
         </div>
         {isBackupLoading ? (
            <CustomLoading />
         ) : (
            <>
               <div className={styles.body}>
                  <div style={isDarkModeTrigger(2, true, isDarkMode)}>
                     <img src={copySVG} alt='copy' />
                     <p style={isDarkModeTrigger(1, false, isDarkMode)} onClick={handlePostBackup}>
                        {t('admin.db.copyToDb')}
                     </p>
                  </div>
                  <div
                     style={isDarkModeTrigger(2, true, isDarkMode)}
                     onClick={() => setModal(true)}
                  >
                     <img src={refreshSVG} alt='refresh' />
                     <p style={isDarkModeTrigger(1, false, isDarkMode)}>
                        {t('admin.db.restoreDb')}
                     </p>
                  </div>
               </div>

               <div className={styles.footer}>
                  {buckups.backups?.map((item, index) => (
                     <h1 key={index} style={isDarkModeTrigger(1, false, isDarkMode)}>
                        {item}
                     </h1>
                  ))}
               </div>
               {modal ? <DbModal backups={buckups} modal={modal} setModal={setModal} /> : null}
            </>
         )}
      </div>
   );
};

export default DataBase;
