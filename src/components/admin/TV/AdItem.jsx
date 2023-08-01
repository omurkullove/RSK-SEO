import { baseUrl, isDarkModeTrigger } from '@/utils/utils';

import { Image } from 'antd';
import React from 'react';
import styles from './TV.module.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';

const AdItem = ({ id, title, image, onDelete, handleAdPicker }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   return (
      <div className={styles.ad_item}>
         <div className={styles.ad_item_image}>
            <Image src={`${baseUrl}${image}`} alt={title} />
         </div>
         <div className={styles.ad_item_content}>
            <h3 style={isDarkModeTrigger(1, false, isDarkMode)}>{title}</h3>
            <div>
               <button onClick={() => onDelete(id)}>{t('buttons.delete')}</button>
               <button onClick={() => handleAdPicker(id)}>{t('buttons.edit')}</button>
               <a target='_blank' href={`${baseUrl}${image}`}>
                  asdf
               </a>
            </div>
         </div>
      </div>
   );
};

export default AdItem;
