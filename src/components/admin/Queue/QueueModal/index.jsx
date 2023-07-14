import { Alert, Popover, Select } from 'antd';
import { CustomModalLoading, branchIndeficator, serviceIndetificator } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

import ModalWrapper from '@/components/admin/ModalWrapper';
import { alertComponents } from '@/utils/popoverHint';
import info_icon from '@/assets/svg/Info_icon.svg';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { useAdmin } from '@/services/adminStore';
import { useMain } from '@/services/MainStore';

const QueueModal = ({ isQueModal, setIsQueModal, queue, serviceList }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);

   const editQueue = useAdmin((state) => state.editQueue);
   const adminIdentifier = useMain((state) => state.adminIdentifier);
   const isSuperAdmin = useMain((state) => state.isSuperAdmin);

   const getBranchList = useAdmin((state) => state.getBranchList);
   const branchList = useAdmin((state) => state.branchList);
   const isBranchListLoading = useAdmin((state) => state.isBranchListLoading);

   const [newQueue, setNewQueue] = useState(queue);

   const TBody = [
      {
         hintAlert: <Alert {...alertComponents.idHint} />,
         id: 1,
         title: 'ID',
         data: queue.id,
         name: 'id',
      },
      {
         hintAlert: <Alert {...alertComponents.stingAny} />,
         id: 2,
         title: 'Описание',
         data: queue.description ? queue.description : undefined,
         name: 'description',
      },
      {
         hintAlert: <Alert {...alertComponents.selectKeyWord} />,
         id: 3,
         title: 'Услуга',
         data: newQueue.service,
         name: 'service',
      },
      {
         hintAlert: <Alert {...alertComponents.selectKeyWord} />,
         id: 4,
         title: 'Филиал',
         data: queue?.branch,
         name: 'branch',
      },
      {
         hintAlert: <Alert {...alertComponents.numberAny} />,
         id: 5,
         title: 'Всего талонов',
         data: queue.talon_count,
         name: 'talon_count',
      },
   ];

   const handleEdit = (name, value) => {
      setNewQueue((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const deleteQueue = useAdmin((state) => state.deleteQueue);
   const getQueueList = useAdmin((state) => state.getQueueList);

   const handleSave = async (e) => {
      e.preventDefault();
      await editQueue(queue.id, newQueue);
      await getQueueList();

      setIsQueModal(false);
   };
   const handleDelete = async (e, id) => {
      e.preventDefault();
      await deleteQueue(id);
      await getQueueList();

      setIsQueModal(false);
   };

   useEffect(() => {
      adminIdentifier();
      getBranchList();
      console.log(isBranchListLoading);
   }, []);

   const serviceOptions = serviceList?.map((item) => ({
      label: item?.name,
      value: item?.id,
   }));

   const branchOptions = branchList?.map((item) => ({
      label: `${item?.city}, ${item?.address}`,
      value: item?.id,
   }));

   return (
      <ModalWrapper isOpen={isQueModal} setIsOpen={setIsQueModal}>
         <div
            className={styles.queueMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head}>
               <input
                  readOnly={!isSuperAdmin}
                  defaultValue={queue.description}
                  onChange={(e) => handleEdit(e)}
                  name='service'
               />
               <Popover trigger={'hover'} content={<Alert {...alertComponents.stingAny} />}>
                  <img src={info_icon} alt='info' style={{ width: '24px', cursor: 'pointer' }} />
               </Popover>
            </div>
            {isBranchListLoading ? (
               <CustomModalLoading />
            ) : (
               <form className={styles.body} onSubmit={handleSave} action='submit'>
                  {TBody.map((item) => (
                     <div className={styles.line} key={item.id}>
                        <p>{item.title}:</p>
                        {item.name === 'service' ? (
                           <Select
                              value={newQueue.service}
                              onChange={(value) => handleEdit('service', value)}
                              disabled={!isSuperAdmin}
                              options={serviceOptions}
                              defaultValue={serviceIndetificator(serviceList, queue.service)}
                              style={{ width: '185px', marginRight: '100px' }}
                           />
                        ) : item.name === 'branch' ? (
                           <Select
                              value={newQueue.branch}
                              onChange={(value) => handleEdit('branch', value)}
                              disabled={!isSuperAdmin}
                              options={branchOptions}
                              defaultValue={branchIndeficator(serviceList, queue.branch)}
                              style={{ width: '185px', marginRight: '100px' }}
                           />
                        ) : (
                           <input
                              readOnly={item.name === 'id' || !isSuperAdmin ? true : false}
                              name={item.name}
                              defaultValue={typeof item.data === 'undefined' ? '-' : item.data}
                              onChange={(e) => handleEdit(item.name, e.target.value)}
                           />
                        )}
                        <Popover content={item.hintAlert} trigger={'hover'}>
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
                           <button onClick={(e) => handleDelete(e, newQueue.id)} type='button'>
                              Удалить
                           </button>
                           <button onClick={() => setIsQueModal(false)} type='button'>
                              Отмена
                           </button>
                           <button type='submit'>Сохранить</button>
                        </>
                     ) : (
                        <button onClick={() => setIsQueModal(false)} type='button'>
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

export default QueueModal;
