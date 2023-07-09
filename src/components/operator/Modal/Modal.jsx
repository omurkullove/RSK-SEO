import React, { useState } from 'react';
import styles from '@/assets/styles/operator/Modal.module.scss';
import { Select } from 'antd';
import { useMain } from '@/services/MainStore';
import { useTranslation } from 'react-i18next';
import { useOperator } from '@/services/operatorStore';
import { ShowMessage } from '@/utils/utils';

const Modal = ({ isModal, setIsModal, talon }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);
   const transferTalonToAnotherQueue = useOperator((state) => state.transferTalonToAnotherQueue);
   const getTalonsLoading = useOperator((state) => state.getTalonsLoading);
   const getTalons = useOperator((state) => state.getTalons);
   const { t } = useTranslation();
   const [branch, setBranch] = useState();

   const handleTransferToAnotherQueue = async () => {
      console.log(talon, branch);
      await transferTalonToAnotherQueue(talon.token, 3);
      await getTalons(JSON.parse(localStorage.getItem('token')) || {});
      if (!getTalonsLoading) {
         ShowMessage('success', 'Талон успешно перенесен!');
      }
      setIsModal(false);
   };

   return (
      <div
         className={`${styles.modal} ${isModal ? styles.active : ''}`}
         onClick={() => setIsModal(false)}
      >
         <div
            className={styles.modal__content}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <p>Выберите очередь</p>
            <Select
               style={{ width: '100%' }}
               dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
               className={''}
               onSelect={(value) => setBranch(value)}
               placeholder={'Выбрать очередь'}
               options={[
                  {
                     value: 1,
                     label: t('table.body.service.CreditFinancing'),
                  },
                  {
                     value: 2,
                     label: t('table.body.service.CurrencyExchange'),
                  },
                  {
                     value: 3,
                     label: t('table.body.service.MoneyTransfers'),
                  },
                  {
                     value: 4,
                     label: t('table.body.service.CardIssuance'),
                  },
                  {
                     value: 5,
                     label: t('table.body.service.ReceiveTransfer'),
                  },
                  {
                     value: 6,
                     label: t('table.body.service.OpenAnAccount'),
                  },
                  {
                     value: 7,
                     label: t('table.body.service.SecuritiesOperations'),
                  },
                  {
                     value: 8,
                     label: t('table.body.service.IslamicFinancing'),
                  },
               ]}
               size='large'
            />
            <div className={styles.buttonBlock}>
               <button onClick={() => setIsModal(false)}>Отмена</button>
               <button onClick={() => handleTransferToAnotherQueue()}>Перенести</button>
            </div>
         </div>
      </div>
   );
};

export default Modal;
