import {
   CustomModalLoading,
   MainBranchOptions,
   MainServiceOptions,
   isDarkModeTrigger,
   selectModalStyles,
} from '@/utils/utils';

import ModalWrapper from '@/components/admin/ModalWrapper';
import { Select } from 'antd';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { t } from 'i18next';
import { useCreateQueueMutation } from '@/api/admin/queue_api';
import { useGetBranchQuery } from '@/api/admin/branch_api';
import { useGetServiceQuery } from '@/api/admin/service_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CreateQueueModal = ({ isCreateQueModal, setIsCreateQueModal }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [queue, setQueue] = useState();

   const { data: serviceList, isLoading: isServiceListLoading } = useGetServiceQuery();
   const { data: branchList, isLoading: isBrancLihstLoading } = useGetBranchQuery();

   const [createQueue] = useCreateQueueMutation();

   const handleEdit = (name, value) => {
      setQueue((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleCreateQueue = async (e) => {
      e.preventDefault();
      await createQueue(queue);
      setIsCreateQueModal(false);
   };

   const serviceOptions = MainServiceOptions(serviceList, isDarkMode);

   const branchOptions = MainBranchOptions(branchList, isDarkMode);

   return (
      <ModalWrapper isOpen={isCreateQueModal} setIsOpen={setIsCreateQueModal}>
         <div
            className={styles.createQueueMain}
            onClick={(e) => e.stopPropagation()}
            style={isDarkModeTrigger(2, true, isDarkMode)}
         >
            {isBrancLihstLoading && isServiceListLoading ? (
               <CustomModalLoading />
            ) : (
               <>
                  <div className={styles.head} style={isDarkModeTrigger(1, true, isDarkMode)}>
                     <p style={isDarkModeTrigger(1, false, isDarkMode)}>
                        {t('buttons.createQueue')}
                     </p>
                  </div>
                  <form action='submit' onSubmit={handleCreateQueue}>
                     <input
                        style={{ background: 'transparent', color: isDarkMode ? 'white' : '' }}
                        onChange={(e) => handleEdit('description', e.target.value)}
                        type='string'
                        placeholder={t('admin.queueModal.description')}
                     />
                     <input
                        style={{ background: 'transparent', color: isDarkMode ? 'white' : '' }}
                        onChange={(e) => handleEdit('talon_count', e.target.value)}
                        type='number'
                        placeholder={t('admin.queueModal.talon_count')}
                     />
                     <Select
                        dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                        onChange={(value) => handleEdit('service', value)}
                        required
                        placeholder={t('admin.queueModal.service')}
                        options={serviceOptions}
                        bordered={false}
                        style={selectModalStyles}
                     />
                     <Select
                        dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                        onChange={(value) => handleEdit('branch', value)}
                        required
                        placeholder={t('admin.queueModal.branch')}
                        bordered={false}
                        options={branchOptions}
                        style={selectModalStyles}
                     />

                     <div className={styles.footer}>
                        <button onClick={() => setIsCreateQueModal(false)} type='button'>
                           {t('buttons.cancel')}
                        </button>
                        <button type='submit'>{t('buttons.create')}</button>
                     </div>
                  </form>
               </>
            )}
         </div>
      </ModalWrapper>
   );
};

export default CreateQueueModal;
