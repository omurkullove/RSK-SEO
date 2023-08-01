import { CustomLoading, isDarkModeTrigger, transalteIdentifier } from '@/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CreateServiceModal from './CreateServiceModal';
import ServiceModal from './serviceModal';
import { adminIdentifier } from '@/api/synchronous';
import i18n from '@/i18next';
import styles from './Service.module.scss';
import { t } from 'i18next';
import { useGetLanguageQuery } from '@/api/admin/language_api';
import { useGetServiceQuery } from '@/api/admin/service_api';

const Service = () => {
   const isSuperAdmin = useSelector((state) => state.toggleDarkMode.isSuperAdmin);

   const dispatch = useDispatch();

   const { data: serviceList, isLoading: isServiceListLoading } = useGetServiceQuery();
   const { data: translates, isLoading: isTranslateLoading } = useGetLanguageQuery();

   const [isCreateServiceModal, setIsCreateServiceModal] = useState(false);
   const [isServiceModal, setIsServiceModal] = useState(false);

   const [choosedService, setChoosedService] = useState();

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const hanldeOpenServiceQueue = (item) => {
      setChoosedService(item);
      setIsServiceModal(true);
   };

   useEffect(() => {
      dispatch(adminIdentifier());
   }, []);

   return isServiceListLoading && isTranslateLoading ? (
      <CustomLoading />
   ) : (
      <>
         <div
            className={styles.serviceBlock}
            style={{
               backgroundColor: isDarkMode ? '#001F31' : '',
            }}
         >
            <div className={styles.head}>
               <p style={{ color: isDarkMode ? 'white' : '' }}>{t('admin.titles.services')}</p>
            </div>
            <div className={styles.body}>
               {serviceList.length ? (
                  serviceList?.map((item) => (
                     <div
                        key={item.id}
                        onClick={() => hanldeOpenServiceQueue(item)}
                        style={{
                           backgroundColor: isDarkMode ? '#374B67' : '',
                           color: isDarkMode ? 'white' : '',
                        }}
                     >
                        {item?.name}
                     </div>
                  ))
               ) : (
                  <h1 style={isDarkModeTrigger(1, false, isDarkMode)}>{t('nothingAtTheMoment')}</h1>
               )}
            </div>
            {isSuperAdmin ? (
               <div className={styles.footer}>
                  <button onClick={() => setIsCreateServiceModal(true)}>
                     {t('buttons.createService')}
                  </button>
               </div>
            ) : null}
         </div>
         {isServiceModal && (
            <ServiceModal
               isServiceModal={isServiceModal}
               setIsServiceModal={setIsServiceModal}
               service={choosedService}
               item
            />
         )}
         {isCreateServiceModal && (
            <CreateServiceModal
               isCreateServiceModal={isCreateServiceModal}
               setIsCreateServiceModal={setIsCreateServiceModal}
            />
         )}
      </>
   );
};

export default Service;
