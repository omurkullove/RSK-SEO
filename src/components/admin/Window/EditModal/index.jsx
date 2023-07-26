import { MainBranchOptions, ShowMessage, isDarkModeTrigger } from '@/utils/utils';

import ModalWrapper from '../../ModalWrapper';
import { Select } from 'antd';
import styles from '../Window.module.scss';
import { t } from 'i18next';
import { useGetBranchListQuery } from '@/api/registrar/registrar_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useUpdateWindowMutation } from '@/api/admin/window_api';

const EditModal = ({ isModal, setIsModal, window, refetch }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [editWindow] = useUpdateWindowMutation();
   const { data: branchList, isLoading: isBranchListLoading } = useGetBranchListQuery();

   const [newWindow, setNewWindow] = useState(window);

   const handleEdit = (name, value) => {
      setNewWindow((prev) => ({
         ...prev,
         [name]: +value,
      }));
   };

   const handleSave = async (e) => {
      e.preventDefault();
      if (!newWindow.branch) {
         ShowMessage('warning', 'Филиал не выбран');
         return;
      }

      await editWindow(newWindow);
      await refetch();

      setIsModal(false);
   };

   const branchOptions = MainBranchOptions(branchList, isDarkMode);

   return (
      <ModalWrapper isOpen={isModal} setIsOpen={setIsModal}>
         <form
            className={styles.editModal}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
            onSubmit={handleSave}
         >
            <p style={isDarkModeTrigger(1, false, isDarkMode)}>{t('admin.windowMain.branch')}</p>
            <Select
               style={{ width: '50%' }}
               dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
               onChange={(value) => handleEdit('branch', value)}
               defaultValue={window.branch}
               options={branchOptions}
               size='large'
            />
            <p style={isDarkModeTrigger(1, false, isDarkMode)}>
               {t('admin.windowMain.windowNumber')}
            </p>
            <input
               style={isDarkModeTrigger(1, false, isDarkMode)}
               required
               type='number'
               onChange={(e) => handleEdit('number', e.target.value)}
               value={newWindow?.number || ''}
               placeholder={t('admin.windowMain.windowNumber')}
            />

            <div className={styles.buttonBlock}>
               <button onClick={() => setIsModal(false)} type='button'>
                  {t('buttons.cancel')}
               </button>
               <button type='submit'>{t('buttons.save')}</button>
            </div>
         </form>
      </ModalWrapper>
   );
};

export default EditModal;
