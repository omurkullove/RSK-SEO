import { isDarkModeTrigger, selectModalStyles } from '@/utils/utils';
import { usePostBackupMutation, useRestoreMutation } from '@/api/admin/db_api';

import ModalWrapper from '../ModalWrapper';
import { Select } from 'antd';
import styles from './DataBase.module.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const DbModal = ({ backups, modal, setModal }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);
   const [restore] = useRestoreMutation();

   const [backup, setBackup] = useState('');

   const onChange = (value) => {
      setBackup(value);
   };

   const selelctOptions = backups?.backups?.map((item) => ({
      label: item,
      value: item,
   }));

   const handleSubmit = async () => {
      const body = {
         data: backup,
      };

      await restore(body);
      setModal(false);
   };

   return (
      <ModalWrapper isOpen={modal} setIsOpen={setModal}>
         <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
            style={isDarkModeTrigger(1, true, isDarkMode)}
         >
            <div className={styles.header}>
               <h1 style={isDarkModeTrigger(1, false, isDarkMode)}>{t('backup')}</h1>
            </div>

            <div className={styles.modalBody}>
               <Select
                  style={{ ...selectModalStyles }}
                  bordered={false}
                  options={selelctOptions}
                  value={backup}
                  onChange={(value) => onChange(value)}
               />
            </div>
            <div className={styles.footer}>
               <button onClick={() => setModal(false)}>{t('buttons.cancel')}</button>
               <button onClick={handleSubmit}>{t('buttons.restore')}</button>
            </div>
         </div>
      </ModalWrapper>
   );
};

export default DbModal;
