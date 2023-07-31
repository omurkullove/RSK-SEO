import { CustomLoading, isDarkModeTrigger } from '@/utils/utils';
import React, { useRef, useState } from 'react';
import {
   useCreateAdMutation,
   useGetAdQuery,
   useGetRunnigLineQuery,
   useRemoveAdMutation,
} from '@/api/admin/tvConfig_api';

import AdItem from './AdItem';
import TVModal from './TVModal';
import styles from './TV.module.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

export const Ad = () => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const { data: adList, isLoading: isAdListLoading } = useGetAdQuery();
   const [createAd] = useCreateAdMutation();
   const [removeAd] = useRemoveAdMutation();

   const formRef = useRef(null);

   const [ad, setAd] = useState({});
   const [isModal, setIsModal] = useState(false);
   const [currentAd, setCurrentAd] = useState();

   const handleDeleteAd = async (id) => {
      await removeAd(id);
   };

   const handleChange = (name, value) => {
      setAd((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleCreate = async (e) => {
      e.preventDefault();

      const formData = new FormData();

      formData.append('title', ad.title);
      formData.append('image', ad.image);

      await createAd(formData);

      formRef.current.reset();
      setAd({});
   };

   const handleAdPicker = (id) => {
      setIsModal(true);
      const choosedAd = adList?.filter((item) => item?.id == id);
      setCurrentAd(choosedAd[0]);
   };

   return (
      <>
         <form className={styles.container} action='submit' onSubmit={handleCreate} ref={formRef}>
            <input
               onChange={(e) => handleChange('title', e.target.value)}
               placeholder={t('admin.tv.ad_title')}
               minLength={1}
               maxLength={50}
               required
               value={ad.title || ''}
               style={isDarkModeTrigger(1, false, isDarkMode)}
            />
            <br />
            <input
               onChange={(e) => handleChange('image', e.target.files[0])}
               style={isDarkModeTrigger(1, false, isDarkMode)}
               type='file'
               minLength={1}
               maxLength={1}
               required
            />
            <button type='submit'>{t('buttons.create')}</button>
         </form>

         {isModal ? (
            <TVModal isModal={isModal} setIsModal={setIsModal} currentAd={currentAd} />
         ) : null}

         {isAdListLoading ? (
            <CustomLoading />
         ) : (
            <div className={styles.app}>
               {adList?.map((ad) => (
                  <AdItem
                     key={ad.id}
                     {...ad}
                     onDelete={handleDeleteAd}
                     handleAdPicker={handleAdPicker}
                  />
               ))}
            </div>
         )}
      </>
   );
};
