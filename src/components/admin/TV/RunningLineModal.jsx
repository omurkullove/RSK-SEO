import React, { useState } from 'react';
import { baseUrl, isDarkModeTrigger } from '@/utils/utils';

import { Image } from 'antd';
import ModalWrapper from '../ModalWrapper';
import styles from './TV.module.scss';
import { t } from 'i18next';
import { useEditRunningLineMutation } from '@/api/admin/tvConfig_api';
import { useSelector } from 'react-redux';

const RunningLineModal = ({ currentRunnigLine, isModal, setIsModal }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [editeRunningLine] = useEditRunningLineMutation();

   const [newRunningLine, setNewRunningLine] = useState(currentRunnigLine);

   const handleChange = (name, value) => {
      setNewRunningLine((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      await editeRunningLine(newRunningLine);

      setIsModal(false);
   };

   return (
      <ModalWrapper isOpen={isModal} setIsOpen={setIsModal}>
         <form
            action='submit'
            className={styles.modalRunningLineMain}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            style={isDarkModeTrigger(2, true, isDarkMode)}
         >
            <input
               required
               style={isDarkModeTrigger(1, false, isDarkMode)}
               placeholder={t('admin.tv.ad_title')}
               type='text'
               maxLength={50}
               onChange={(e) => handleChange('title', e.target.value)}
               defaultValue={currentRunnigLine?.title || ''}
            />
            <textarea
               style={isDarkModeTrigger(2, false, isDarkMode)}
               required
               placeholder={t('admin.tv.text')}
               onChange={(e) => handleChange('text', e.target.value)}
               type='text'
               maxLength={50}
               defaultValue={currentRunnigLine?.text || ''}
            />

            <div className={styles.footer}>
               <button onClick={() => setIsModal(false)} type='button'>
                  {t('buttons.cancel')}
               </button>
               <button type='submit'>{t('buttons.save')}</button>
            </div>
         </form>
      </ModalWrapper>
   );
};

export default RunningLineModal;
