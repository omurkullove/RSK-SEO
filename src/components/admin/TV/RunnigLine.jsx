import { CustomLoading, isDarkModeTrigger } from '@/utils/utils';
import React, { useState } from 'react';
import {
   useCreateRunningLineMutation,
   useEditRunningLineMutation,
   useGetRunnigLineQuery,
   useRemoveRunningLineMutation,
} from '@/api/admin/tvConfig_api';

import RunningLineModal from './RunningLineModal';
import TVModal from './TVModal';
import styles from './TV.module.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

const RunnigLine = () => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);
   const { data: runningLineList, isLoading: isRunningLineLoading } = useGetRunnigLineQuery();
   const [createRunningLine] = useCreateRunningLineMutation();
   const [deleteRunningLine] = useRemoveRunningLineMutation();

   const [runningLine, setRunnigLine] = useState({});

   const [currentRunnigLine, setCurrentRunningLine] = useState();

   const [isModal, setIsModal] = useState(false);

   const handleChange = (name, value) => {
      setRunnigLine((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleCreate = async (e) => {
      e.preventDefault();
      await createRunningLine(runningLine);
      setRunnigLine({});
   };

   const runningLinePicker = (id) => {
      setIsModal(true);
      const currentRunnigLine = runningLineList?.filter((item) => item.id === id);
      setCurrentRunningLine(currentRunnigLine[0]);
   };

   const handleDelete = async (id) => {
      await deleteRunningLine(id);
   };

   return (
      <>
         <form className={styles.runningLineContainer} action='submit' onSubmit={handleCreate}>
            <input
               required
               onChange={(e) => handleChange('title', e.target.value)}
               placeholder={t('admin.tv.ad_title')}
               maxLength={50}
               minLength={1}
               value={runningLine.title || ''}
               style={isDarkModeTrigger(1, false, isDarkMode)}
            />
            <br />
            <textarea
               required
               style={isDarkModeTrigger(1, false, isDarkMode)}
               placeholder={t('admin.tv.text')}
               onChange={(e) => handleChange('text', e.target.value)}
               type='text'
               maxLength={300}
               minLength={5}
               value={runningLine.text || ''}
            />
            <button type='submit'>{t('buttons.create')}</button>
         </form>

         {isModal ? (
            <RunningLineModal
               isModal={isModal}
               setIsModal={setIsModal}
               currentRunnigLine={currentRunnigLine}
            />
         ) : null}

         {isRunningLineLoading ? (
            <CustomLoading />
         ) : (
            <div className={styles.runningLineBlock}>
               {runningLineList?.map((item) => (
                  <div
                     className={styles.runningLineItem}
                     key={item.id}
                     style={isDarkModeTrigger(2, true, isDarkMode)}
                  >
                     <div className={styles.content}>
                        <p className={styles.title} style={isDarkModeTrigger(1, false, isDarkMode)}>
                           {item.title}
                        </p>
                        <p className={styles.text} style={isDarkModeTrigger(2, false, isDarkMode)}>
                           {item.text}
                        </p>
                     </div>
                     <div className={styles.footer}>
                        <button onClick={() => handleDelete(item.id)}>{t('buttons.delete')}</button>
                        <button onClick={() => runningLinePicker(item.id)}>
                           {t('buttons.edit')}
                        </button>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </>
   );
};

export default RunnigLine;
