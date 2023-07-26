import { Alert, Popover, Select } from 'antd';
import {
   CustomModalLoading,
   MainBranchOptions,
   MainServiceOptions,
   branchIndeficator,
   isDarkModeTrigger,
   serviceIndetificator,
} from '@/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRemoveQueueMutation, useUpdateQueueMutation } from '@/api/admin/queue_api';

import ModalWrapper from '@/components/admin/ModalWrapper';
import { adminIdentifier } from '@/api/synchronous';
import { alertComponents } from '@/utils/popoverHint';
import info_icon from '@/assets/svg/Info_icon.svg';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { t } from 'i18next';
import { useGetBranchQuery } from '@/api/admin/branch_api';
import { useGetServiceQuery } from '@/api/admin/service_api';

const QueueModal = ({ isQueModal, setIsQueModal, queue }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const dispatch = useDispatch();
   const isSuperAdmin = useSelector((state) => state.toggleDarkMode.isSuperAdmin);

   const { data: branchList, isLoading: isBranchListLoading } = useGetBranchQuery();
   const { data: serviceList, isLoading: isServiceListLoading } = useGetServiceQuery();

   const [deleteQueue] = useRemoveQueueMutation();
   const [editQueue] = useUpdateQueueMutation();

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

   const handleSave = async (e) => {
      e.preventDefault();

      await editQueue(newQueue);

      setIsQueModal(false);
   };

   const handleDelete = async (e, id) => {
      e.preventDefault();

      await deleteQueue(id);

      setIsQueModal(false);
   };

   useEffect(() => {
      dispatch(adminIdentifier());
   }, []);

   const serviceOptions = MainServiceOptions(serviceList, isDarkMode);

   const branchOptions = MainBranchOptions(branchList, isDarkMode);

   console.log(branchList);

   return (
      <ModalWrapper isOpen={isQueModal} setIsOpen={setIsQueModal}>
         <div
            className={styles.queueMain}
            onClick={(e) => e.stopPropagation()}
            style={isDarkModeTrigger(2, true, isDarkMode)}
         >
            <div className={styles.head} style={isDarkModeTrigger(1, true, isDarkMode)}>
               <input
                  style={isDarkModeTrigger(3, false, isDarkMode)}
                  readOnly={true}
                  defaultValue={queue.description}
                  onChange={(e) => handleEdit(e)}
                  name='service'
               />
               <Popover trigger={'hover'} content={<Alert {...alertComponents.stingAny} />}>
                  <img src={info_icon} alt='info' style={{ width: '24px', cursor: 'pointer' }} />
               </Popover>
            </div>
            {isBranchListLoading && isServiceListLoading ? (
               <CustomModalLoading />
            ) : (
               <form className={styles.body} onSubmit={handleSave} action='submit'>
                  {TBody.map((item) => (
                     <div className={styles.line} key={item.id}>
                        <p style={isDarkModeTrigger(3, false, isDarkMode)}>
                           {t(`admin.queueModal.${item.name}`)}:
                        </p>
                        {item.name === 'service' ? (
                           <Select
                              dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                              value={newQueue.service}
                              onChange={(value) => handleEdit('service', value)}
                              disabled={!isSuperAdmin}
                              options={serviceOptions}
                              defaultValue={serviceIndetificator(serviceList, queue.service)}
                              style={{ width: '185px', marginRight: '100px' }}
                           />
                        ) : item.name === 'branch' ? (
                           <Select
                              dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                              value={newQueue.branch}
                              onChange={(value) => handleEdit('branch', value)}
                              disabled={!isSuperAdmin}
                              options={branchOptions}
                              defaultValue={branchIndeficator(serviceList, queue.branch)}
                              style={{ width: '185px', marginRight: '100px' }}
                           />
                        ) : (
                           <input
                              style={isDarkModeTrigger(1, false, isDarkMode)}
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
                              {t('buttons.delete')}
                           </button>
                           <button onClick={() => setIsQueModal(false)} type='button'>
                              {t('buttons.cancel')}
                           </button>
                           <button type='submit'>{t('buttons.save')}</button>
                        </>
                     ) : (
                        <button onClick={() => setIsQueModal(false)} type='button'>
                           {t('buttons.close')}
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
