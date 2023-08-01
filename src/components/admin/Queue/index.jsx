import { CustomLoading, ShowMessage, getServiceName, isDarkModeTrigger } from '@/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import CreateQueueModal from './createQueueModal';
import QueueModal from './QueueModal';
import { adminIdentifier } from '@/api/synchronous';
import styles from './Queue.module.scss';
import { t } from 'i18next';
import { useGetLanguageQuery } from '@/api/admin/language_api';
import { useGetQueueQuery } from '@/api/admin/queue_api';
import { useGetServiceQuery } from '@/api/admin/service_api';

const Queue = () => {
   const isSuperAdmin = useSelector((state) => state.toggleDarkMode.isSuperAdmin);
   const dispatch = useDispatch();

   const {
      data: queueList,
      isLoading: isQueueListLoading,
      isSuccess: isQueueSuccess,
   } = useGetQueueQuery();
   const {
      data: serviceList,
      isLoading: isServiceListLoading,
      isSuccess: isServiceSuccess,
   } = useGetServiceQuery();

   const [isQueModal, setIsQueModal] = useState(false);
   const [isCreateQueModal, setIsCreateQueModal] = useState(false);

   const [choosedQueue, setChoosedQueue] = useState();
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);
   const { data: translates, isLoading: isTransaltesLoading } = useGetLanguageQuery();

   const handleOpenQueueModal = (item) => {
      setChoosedQueue(item);
      setIsQueModal(true);
   };

   useEffect(() => {
      dispatch(adminIdentifier());
      if (isServiceSuccess && isQueueSuccess) {
         ShowMessage('success', 'Данные успешно загрузились!');
         return;
      }
   }, []);

   return isQueueListLoading || isServiceListLoading || isTransaltesLoading ? (
      <CustomLoading />
   ) : (
      <>
         <div
            className={styles.queueBlock}
            style={{ backgroundColor: isDarkMode ? '#001F31' : '' }}
         >
            <div className={styles.head}>
               <p style={{ color: isDarkMode ? 'white' : '' }}>{t('admin.titles.queues')}</p>
            </div>
            <div className={styles.body}>
               {queueList?.length ? (
                  queueList?.map((item) => (
                     <div
                        key={item.id}
                        onClick={() => handleOpenQueueModal(item)}
                        style={{
                           backgroundColor: isDarkMode ? '#374B67' : '',
                           color: isDarkMode ? 'white' : '',
                        }}
                     >
                        {getServiceName(
                           serviceList?.find((service) => service.id === item.service)?.name
                        )}{' '}
                        №{item.id}
                     </div>
                  ))
               ) : (
                  <h1 style={isDarkModeTrigger(1, false, isDarkMode)}>{t('nothingAtTheMoment')}</h1>
               )}
            </div>
            {isSuperAdmin ? (
               <div className={styles.footer}>
                  <button onClick={() => setIsCreateQueModal(true)}>
                     {t('buttons.createQueue')}
                  </button>
               </div>
            ) : null}
         </div>
         {isQueModal && (
            <QueueModal
               isQueModal={isQueModal}
               setIsQueModal={setIsQueModal}
               queue={choosedQueue}
            />
         )}
         {isCreateQueModal && (
            <CreateQueueModal
               isCreateQueModal={isCreateQueModal}
               setIsCreateQueModal={setIsCreateQueModal}
            />
         )}
      </>
   );
};

export default Queue;
