import React, { useState } from 'react';
import { baseUrl, isDarkModeTrigger } from '@/utils/utils';

import { Image } from 'antd';
import ModalWrapper from '../ModalWrapper';
import styles from './TV.module.scss';
import { t } from 'i18next';
import { useEditAdMutation } from '@/api/admin/tvConfig_api';
import { useSelector } from 'react-redux';

const TVModal = ({ currentAd, isModal, setIsModal }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [editAd] = useEditAdMutation();

   const [newAd, setNewAd] = useState(currentAd);
   const [isFileChanged, setIsFileChanged] = useState(false);
   const [fileUrl, setFileUrl] = useState();

   const handleChange = (name, value) => {
      if (name === 'image') {
         setIsFileChanged(true);
         handleFileChanged(value);
      }
      setNewAd((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('title', newAd.title);

      if (isFileChanged) {
         formData.append('image', newAd.image);
      }

      const body = {
         id: newAd.id,
         data: formData,
      };

      await editAd(body);

      setIsModal(false);
   };

   const handleFileChanged = (value) => {
      const reader = new FileReader();

      reader.onloadend = () => {
         setFileUrl(reader.result);
      };
      reader.readAsDataURL(value);
   };

   return (
      <ModalWrapper isOpen={isModal} setIsOpen={setIsModal}>
         <form
            action='submit'
            className={styles.modalMain}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            style={isDarkModeTrigger(2, true, isDarkMode)}
         >
            <input
               style={isDarkModeTrigger(1, false, isDarkMode)}
               required
               placeholder={t('admin.tv.ad_title')}
               type='text'
               maxLength={50}
               onChange={(e) => handleChange('title', e.target.value)}
               defaultValue={currentAd?.title || ''}
            />
            <input
               style={isDarkModeTrigger(1, false, isDarkMode)}
               type='file'
               maxLength={1}
               onChange={(e) => handleChange('image', e.target.files[0])}
            />
            <Image
               src={isFileChanged ? fileUrl : `${baseUrl}${newAd.image}`}
               height={200}
               width={350}
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

export default TVModal;
