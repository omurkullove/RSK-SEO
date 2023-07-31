import {
   MainServiceOptions,
   isDarkModeTrigger,
   returnUnderstandableDate,
   selectModalStyles,
} from '@/utils/utils';

import ModalWrapper from '../../ModalWrapper';
import { Select } from 'antd';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { t } from 'i18next';
import { useCreateBranchMutation } from '@/api/admin/branch_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CreateBranchModal = ({ isCreateModal, setIsCreateModal, serviceList, languageList }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [createBranch] = useCreateBranchMutation();

   const languageOptions = languageList.map((item) => ({
      label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{item.text}</p>,
      value: item.id,
   }));

   const [branch, setBranch] = useState();

   const handleEdit = (name, value) => {
      if (name === 'service' || name === 'lang_name') {
         setBranch((prev) => ({
            ...prev,
            [name]: [...value],
         }));
      } else {
         setBranch((prev) => ({
            ...prev,
            [name]: value,
         }));
      }
   };

   const handleCreate = async (e) => {
      e.preventDefault();

      const isosDateStart = returnUnderstandableDate(branch.work_time_start, true);
      const isosDateEnd = returnUnderstandableDate(branch.work_time_end, true);

      setBranch((prev) => ({
         ...prev,
         work_time_start: isosDateStart,
         work_time_end: isosDateEnd,
      }));

      await createBranch(branch);

      setIsCreateModal(false);
   };

   const serviceOptions = MainServiceOptions(serviceList, isDarkMode);

   return (
      <ModalWrapper isOpen={isCreateModal} setIsOpen={setIsCreateModal}>
         <div
            className={styles.createBranchMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div>
               <div className={styles.head}>
                  <p>{t('buttons.createBranch')} </p>
               </div>
               <form action='submit' onSubmit={handleCreate}>
                  <input
                     style={isDarkModeTrigger(1, false, isDarkMode)}
                     onChange={(e) => handleEdit('city', e.target.value)}
                     type='string'
                     placeholder={t('admin.branchMain.city')}
                  />
                  <input
                     style={isDarkModeTrigger(1, false, isDarkMode)}
                     onChange={(e) => handleEdit('address', e.target.value)}
                     placeholder={t('admin.branchMain.address')}
                  />
                  <Select
                     mode='multiple'
                     dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
                     onChange={(value) => handleEdit('service', value)}
                     required
                     placeholder={t('admin.branchMain.service')}
                     options={serviceOptions}
                     bordered={false}
                     style={selectModalStyles}
                  />
                  <Select
                     dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                     mode='multiple'
                     onChange={(value) => handleEdit('lang_name', value)}
                     options={languageOptions}
                     style={{ ...selectModalStyles }}
                     bordered={false}
                     placeholder={t('admin.branchMain.lang_name')}
                  />

                  <label
                     style={{
                        marginTop: 25,
                        fontWeight: 'bold',
                        color: isDarkMode ? 'white' : '#1e4a89',
                        width: '100%',
                     }}
                  >
                     {t('admin.branchMain.work_time_start')}
                     <input
                        style={{
                           ...isDarkModeTrigger(1, false, isDarkMode),
                           marginTop: 0,
                        }}
                        type='time'
                        onChange={(e) => handleEdit('work_time_start', e.target.value)}
                     />
                  </label>
                  <label
                     style={{
                        marginTop: 25,
                        fontWeight: 'bold',
                        color: isDarkMode ? 'white' : '#1e4a89',
                        width: '100%',
                     }}
                  >
                     {t('admin.branchMain.work_time_end')}
                     <input
                        style={{ ...isDarkModeTrigger(1, false, isDarkMode), marginTop: 0 }}
                        type='time'
                        onChange={(e) => handleEdit('work_time_end', e.target.value)}
                     />
                  </label>

                  <div className={styles.footer}>
                     <button onClick={() => setIsCreateModal(false)} type='button'>
                        {t('buttons.cancel')}
                     </button>
                     <button type='submit'>{t('buttons.create')}</button>
                  </div>
               </form>
            </div>
         </div>
      </ModalWrapper>
   );
};

export default CreateBranchModal;
