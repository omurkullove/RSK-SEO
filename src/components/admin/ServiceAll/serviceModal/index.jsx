import React, { useState } from 'react';
import ModalWrapper from '@/components/admin/ModalWrapper';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { useMain } from '@/services/MainStore';
import { useAdmin } from '@/services/adminStore';
import info_icon from '@/assets/svg/Info_icon.svg';
import { Popover, Alert } from 'antd';

const ServiceModal = ({ isServiceModal, setIsServiceModal, service }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);
   const [serviceState, setServiceState] = useState(service);

   const handleEdit = (e) => {
      const { value, name, type } = e.target;
      const processedValue = type === 'number' ? Number(value) : value;

      if (name === 'documents') {
         setServiceState((prev) => ({
            ...prev,
            [name]: [+processedValue],
         }));
      } else if (name === 'lang_name') {
         setServiceState((prev) => ({
            ...prev,
            [name]: [+processedValue],
         }));
      } else {
         setServiceState((prev) => ({
            ...prev,
            [name]: processedValue,
         }));
      }
   };

   const handleSave = (e) => {
      e.preventDefault();
      console.log(serviceState);
   };

   const TBody = [
      {
         id: 1,
         title: 'ID',
         data: service.id,
         name: 'id',
      },
      {
         id: 2,
         title: 'Название',
         data: service.name,
         name: 'name',
      },
      {
         id: 3,
         title: 'Cреднее время обслуживания',
         data: service.average_time,
         name: 'average_time',
      },
      {
         id: 4,
         title: 'Авто перенос',
         data: service.auto_transport,
         name: 'auto_transport',
      },
      {
         id: 5,
         title: 'Услуга для переноса',
         data: service.service_to_auto_transport,
         name: 'service_to_auto_transport',
      },
   ];

   return (
      <ModalWrapper isOpen={isServiceModal} setIsOpen={setIsServiceModal}>
         <div
            className={styles.serviceMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head}>
               <input defaultValue={service.name} onChange={(e) => handleEdit(e)} name='service' />
               <img src={info_icon} alt='info' style={{ width: '24px', cursor: 'pointer' }} />
            </div>

            <form className={styles.body} onSubmit={handleSave} action='submit'>
               {TBody.map((item) => (
                  <div className={styles.line} key={item.id}>
                     <p>{item.title}:</p>

                     <input
                        name={item.name}
                        defaultValue={
                           typeof item.data === 'undefined' || item.data === null ? '-' : item.data
                        }
                        onChange={(e) => handleEdit(e)}
                     />
                     <img src={info_icon} alt='info' style={{ width: '24px', cursor: 'pointer' }} />
                  </div>
               ))}
               <div className={styles.footer}>
                  <button otype='reset'>Удалить</button>
                  <button onClick={() => setIsServiceModal(false)} type='reset'>
                     Отмена
                  </button>
                  <button type='submit'>Сохранить</button>
               </div>
            </form>
         </div>
      </ModalWrapper>
   );
};

export default ServiceModal;
