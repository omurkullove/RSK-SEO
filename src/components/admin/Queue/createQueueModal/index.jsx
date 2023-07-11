import React, { useEffect, useState } from 'react';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { useMain } from '@/services/MainStore';
import { useAdmin } from '@/services/adminStore';
import { Select } from 'antd';
import { CustomModalLoading, selectModalStyles } from '@/utils/utils';
import ModalWrapper from '@/components/admin/ModalWrapper';

const CreateQueueModal = ({ isCreateQueModal, setIsCreateQueModal }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);
   const [queue, setQueue] = useState();

   const isBranchListLoading = useAdmin((state) => state.isBranchListLoading);
   const branchList = useAdmin((state) => state.branchList);
   const getBranchList = useAdmin((state) => state.getBranchList);
   const isServiceListLoading = useAdmin((state) => state.isServiceListLoading);
   const serviceList = useAdmin((state) => state.serviceList);
   const getServiceList = useAdmin((state) => state.getServiceList);

   const createQueue = useAdmin((state) => state.createQueue);
   const getQueueList = useAdmin((state) => state.getQueueList);

   const handleEdit = (name, value) => {
      setQueue((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleCreateQueue = async (e) => {
      e.preventDefault();
      await createQueue(queue);
      await getQueueList();
      setIsCreateQueModal(false);
   };

   const serviceOptions = serviceList?.map((item) => ({
      label: item?.name,
      value: item?.id,
   }));

   const branchOptions = branchList?.map((item) => ({
      label: `${item?.city}, ${item?.address}`,
      value: item?.id,
   }));

   useEffect(() => {
      getBranchList();
      getServiceList();
   }, []);

   return (
      <ModalWrapper isOpen={isCreateQueModal} setIsOpen={setIsCreateQueModal}>
         <div
            className={styles.createQueueMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            {isBranchListLoading && isServiceListLoading ? (
               <CustomModalLoading />
            ) : (
               <>
                  <div className={styles.head}>
                     <p>Создать очередь</p>
                  </div>
                  <form action='submit' onSubmit={handleCreateQueue}>
                     <input
                        onChange={(e) => handleEdit('description', e.target.value)}
                        type='string'
                        placeholder='Описание'
                     />
                     <input
                        onChange={(e) => handleEdit('talon_count', e.target.value)}
                        type='number'
                        placeholder='Кол-во талонов'
                     />
                     <Select
                        onChange={(value) => handleEdit('service', value)}
                        required
                        placeholder='Услуга'
                        options={serviceOptions}
                        bordered={false}
                        style={selectModalStyles}
                     />
                     <Select
                        onChange={(value) => handleEdit('branch', value)}
                        required
                        placeholder='Филиал'
                        bordered={false}
                        options={branchOptions}
                        style={selectModalStyles}
                     />

                     <div className={styles.footer}>
                        <button onClick={() => setIsCreateQueModal(false)}>Отмена</button>
                        <button type='submit'>Создать</button>
                     </div>
                  </form>
               </>
            )}
         </div>
      </ModalWrapper>
   );
};

export default CreateQueueModal;
