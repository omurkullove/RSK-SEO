import React, { useEffect, useState } from 'react';
import styles from './Queue.module.scss';
import { CustomLoading, serviceIndetificator } from '@/utils/utils';
import QueueModal from './QueueModal';
import CreateQueueModal from './createQueueModal';
import { useAdmin } from '@/services/adminStore';
import { useMain } from '@/services/MainStore';

const Queue = () => {
   const queueList = useAdmin((state) => state.queueList);
   const isQueueListLoading = useAdmin((state) => state.isQueueListLoading);
   const getQueueList = useAdmin((state) => state.getQueueList);

   const adminIdentifier = useMain((state) => state.adminIdentifier);
   const isSuperAdmin = useMain((state) => state.isSuperAdmin);
   const getServiceList = useAdmin((state) => state.getServiceList);
   const serviceList = useAdmin((state) => state.serviceList);

   const [isQueModal, setIsQueModal] = useState(false);
   const [isCreateQueModal, setIsCreateQueModal] = useState(false);

   const [choosedQueue, setChoosedQueue] = useState();

   const handleOpenQueueModal = (item) => {
      setChoosedQueue(item);
      setIsQueModal(true);
   };

   useEffect(() => {
      getQueueList();
      adminIdentifier();
      getServiceList();
   }, []);

   return isQueueListLoading && getServiceList ? (
      <CustomLoading />
   ) : (
      <>
         <div className={styles.queueBlock}>
            <div className={styles.head}>
               <p>Очереди</p>
            </div>
            <div className={styles.body}>
               {queueList.length ? (
                  queueList?.map((item) => (
                     <div key={item.id} onClick={() => handleOpenQueueModal(item)}>
                        {serviceList.find((service) => service.id === item.service)?.name}
                     </div>
                  ))
               ) : (
                  <p>На данный момент нет никаких очередей</p>
               )}
            </div>
            {isSuperAdmin ? (
               <div className={styles.footer}>
                  <button onClick={() => setIsCreateQueModal(true)}>Создать очередь</button>
               </div>
            ) : null}
         </div>
         {isQueModal && (
            <QueueModal
               isQueModal={isQueModal}
               setIsQueModal={setIsQueModal}
               queue={choosedQueue}
               serviceList={serviceList}
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
