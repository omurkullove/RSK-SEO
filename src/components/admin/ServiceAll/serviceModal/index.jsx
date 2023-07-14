import { Alert, Popover, Select } from 'antd';
import { CustomModalLoading, selectModalStyles } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

import ModalWrapper from '@/components/admin/ModalWrapper';
import { alertComponents } from '@/utils/popoverHint';
import info_icon from '@/assets/svg/Info_icon.svg';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { useAdmin } from '@/services/adminStore';
import { useMain } from '@/services/MainStore';

const ServiceModal = ({ isServiceModal, setIsServiceModal, service }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);
   const [newService, setNewService] = useState(service);

   const getDocuments = useAdmin((state) => state.getDocuments);
   const documents = useAdmin((state) => state.documents);
   const isDocumentsLoading = useAdmin((state) => state.isDocumentsLoading);

   const getServiceList = useAdmin((state) => state.getServiceList);
   const editService = useAdmin((state) => state.editService);
   const deleteService = useAdmin((state) => state.deleteService);

   const adminIdentifier = useMain((state) => state.adminIdentifier);
   const isSuperAdmin = useMain((state) => state.isSuperAdmin);

   const handleEdit = (name, value) => {
      let newValue;

      if (name === 'documents') {
         newValue = [...value];
      } else if (name === 'lang_name') {
         newValue = [];
      } else {
         newValue = value;
      }

      setNewService((prev) => ({
         ...prev,
         [name]: newValue,
      }));
   };

   const handleSave = async (e) => {
      e.preventDefault();
      await editService(service.id, newService);
      await getServiceList();

      setIsServiceModal(false);
   };

   const hanldeDelete = async () => {
      await deleteService(service.id);
      await getServiceList();

      setIsServiceModal(false);
   };

   const TBody = [
      {
         id: 1,
         title: 'ID',
         data: service.id,
         name: 'id',
         type: 'number',
         hintAlert: <Alert {...alertComponents.idHint} />,
      },
      {
         id: 2,
         title: 'Название',
         data: service.name,
         name: 'name',
         type: 'text',
         hintAlert: <Alert {...alertComponents.stingAny} />,
      },
      {
         id: 3,
         title: 'Cреднее время обслуживания',
         data: service.average_time,
         name: 'average_time',
         type: 'number',
         hintAlert: <Alert {...alertComponents.numberAny} />,
      },
      {
         id: 4,
         title: 'Авто перенос',
         data: service.auto_transport,
         name: 'auto_transport',
         type: 'text',
         hintAlert: <Alert {...alertComponents.booleanKey} />,
      },
      {
         id: 5,
         title: 'Услуга для переноса',
         data: service.service_to_auto_transport,
         name: 'service_to_auto_transport',
         type: 'number',
         hintAlert: <Alert {...alertComponents.selectKeyWord} />,
      },
      {
         id: 6,
         title: 'Ин. язык',
         data: service.lang_name,
         name: 'lang_name',
         type: 'number',
      },
      {
         id: 7,
         title: 'Документы',
         data: documents.length
            ? documents?.map((item) => ({
                 label: item?.name,
                 value: item?.id,
              }))
            : null,
         name: 'documents',
         hintAlert: <Alert {...alertComponents.selectKeyWord} />,
      },
   ];

   useEffect(() => {
      getDocuments();
      adminIdentifier();
   }, []);

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
               <input
                  readOnly={isSuperAdmin}
                  defaultValue={service.name}
                  type='text'
                  onChange={(e) => handleEdit('name', e.target.value)}
               />
               <Popover trigger={'hover'} content={<Alert {...alertComponents.stingAny} />}>
                  <img src={info_icon} alt='info' style={{ width: '24px', cursor: 'pointer' }} />
               </Popover>
            </div>

            {isDocumentsLoading ? (
               <CustomModalLoading />
            ) : (
               <form className={styles.body} onSubmit={handleSave} action='submit'>
                  {TBody.map((item) => (
                     <div className={styles.line} key={item.id}>
                        <p>{item.title}:</p>

                        {item.name === 'documents' ? (
                           <Select
                              disabled={!isSuperAdmin}
                              mode='multiple'
                              onChange={(value) => handleEdit('documents', value)}
                              style={{ width: '185px', marginRight: '100px' }}
                              options={item.data}
                              value={newService.documents}
                              defaultValue={service.documents}
                           />
                        ) : (
                           <input
                              type={item.type}
                              readOnly={item.name === 'id' || !isSuperAdmin ? true : false}
                              defaultValue={
                                 typeof item.data === 'undefined' || item.data === null
                                    ? '-'
                                    : item.data
                              }
                              onChange={(e) => handleEdit(item.name, e.target.value)}
                           />
                        )}
                        <Popover trigger={'hover'} content={item.hintAlert}>
                           <img
                              src={info_icon}
                              alt='info'
                              style={{ width: '24px', cursor: 'pointer' }}
                           />
                        </Popover>
                     </div>
                  ))}

                  <div className={styles.footer}>
                     {isSuperAdmin ? (
                        <>
                           <button onClick={hanldeDelete} type='button'>
                              Удалить
                           </button>
                           <button onClick={() => setIsServiceModal(false)} type='button'>
                              Отмена
                           </button>
                           <button type='submit'>Сохранить</button>
                        </>
                     ) : (
                        <button type='button' onClick={() => setIsServiceModal(false)}>
                           Закрыть
                        </button>
                     )}
                  </div>
               </form>
            )}
         </div>
      </ModalWrapper>
   );
};

export default ServiceModal;
