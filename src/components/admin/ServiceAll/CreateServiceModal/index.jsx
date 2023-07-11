import { CustomModalLoading, selectModalStyles } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

import ModalWrapper from '@/components/admin/ModalWrapper';
import { Select } from 'antd';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { useAdmin } from '@/services/adminStore';
import { useMain } from '@/services/MainStore';

const CreateServiceModal = ({ isCreateServiceModal, setIsCreateServiceModal }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);
   const [service, setService] = useState();

   const getDocuments = useAdmin((state) => state.getDocuments);
   const documents = useAdmin((state) => state.documents);
   const isDocumentsLoading = useAdmin((state) => state.isDocumentsLoading);

   const createService = useAdmin((state) => state.createService);
   const getServiceList = useAdmin((state) => state.getServiceList);

   const handleEdit = (name, value) => {
      let newValue;
      if (name === 'documents') {
         newValue = [...value];
      } else if (name === 'lang_name') {
         newValue = [];
      } else {
         newValue = value;
      }

      setService((prev) => ({
         ...prev,
         [name]: newValue,
      }));
   };

   const handleCreateService = async (e) => {
      e.preventDefault();
      await createService(service);
      await getServiceList();
      setIsCreateServiceModal(false);
   };

   const options = documents?.map((item) => ({
      label: item?.name,
      value: item?.id,
   }));

   useEffect(() => {
      getDocuments();
   }, []);

   return (
      <ModalWrapper isOpen={isCreateServiceModal} setIsOpen={setIsCreateServiceModal}>
         <div
            className={styles.createServiceMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head}>
               <p>Создать услугу</p>
            </div>
            <form action='submit' onSubmit={handleCreateService}>
               {isDocumentsLoading ? (
                  <CustomModalLoading />
               ) : (
                  <>
                     <input
                        onChange={(e) => handleEdit('name', e.target.value)}
                        required
                        type='string'
                        placeholder='Название*'
                     />
                     <input
                        onChange={(e) => handleEdit('number', e.target.value)}
                        name='average_time'
                        type='number'
                        placeholder='Среднее время обслуживания в минутах'
                     />
                     <input
                        onChange={(e) => handleEdit('auto_transport', e.target.value)}
                        type='text'
                        placeholder='Авто перенос талона'
                     />
                     <input
                        onChange={(e) => handleEdit('service_to_auto_transport', e.target.value)}
                        type='number'
                        placeholder='Услуга для переноса'
                     />
                     <input
                        onChange={(e) => handleEdit('lang_name', e.target.value)}
                        type='number'
                        placeholder='Название для разных языков*'
                     />

                     <Select
                        mode='multiple'
                        onChange={(value) => handleEdit('documents', value)}
                        required
                        placeholder='Документы*'
                        bordered={false}
                        options={options}
                        style={selectModalStyles}
                     />
                  </>
               )}

               <div className={styles.footer}>
                  <button onClick={() => setIsCreateServiceModal(false)}>Отмена</button>
                  <button type='submit'>Создать</button>
               </div>
            </form>
         </div>
      </ModalWrapper>
   );
};

export default CreateServiceModal;
