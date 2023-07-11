import React, { useEffect, useState } from 'react';

import CreateServiceModal from './CreateServiceModal';
import { CustomLoading } from '@/utils/utils';
import ServiceModal from './serviceModal';
import styles from './Service.module.scss';
import { useAdmin } from '@/services/adminStore';
import { useMain } from '@/services/MainStore';

const Service = () => {
   const serviceList = useAdmin((state) => state.serviceList);
   const isServiceListLoading = useAdmin((state) => state.isServiceListLoading);

   const getServiceList = useAdmin((state) => state.getServiceList);
   const adminIdentifier = useMain((state) => state.adminIdentifier);
   const isSuperAdmin = useMain((state) => state.isSuperAdmin);

   const [isCreateServiceModal, setIsCreateServiceModal] = useState(false);
   const [isServiceModal, setIsServiceModal] = useState(false);

   const [choosedService, setChoosedService] = useState();

   const hanldeOpenServiceQueue = (item) => {
      setChoosedService(item);
      setIsServiceModal(true);
   };

   useEffect(() => {
      getServiceList();
      adminIdentifier();
   }, []);

   return isServiceListLoading ? (
      <CustomLoading />
   ) : (
      <>
         <div className={styles.serviceBlock}>
            <div className={styles.head}>
               <p>Услуги</p>
            </div>
            <div className={styles.body}>
               {serviceList.length ? (
                  serviceList?.map((item) => (
                     <div key={item.id} onClick={() => hanldeOpenServiceQueue(item)}>
                        {item?.name}
                     </div>
                  ))
               ) : (
                  <p>На данный момент нет никакаких услуг...</p>
               )}
            </div>
            {isSuperAdmin ? (
               <div className={styles.footer}>
                  <button onClick={() => setIsCreateServiceModal(true)}>Создать Услугу</button>
               </div>
            ) : null}
         </div>
         {isServiceModal && (
            <ServiceModal
               isServiceModal={isServiceModal}
               setIsServiceModal={setIsServiceModal}
               service={choosedService}
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
