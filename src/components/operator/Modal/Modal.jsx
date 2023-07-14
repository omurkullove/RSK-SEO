import { CustomLoading, ShowMessage } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

import { Select } from 'antd';
import styles from '@/assets/styles/operator/Modal.module.scss';
import { useMain } from '@/services/MainStore';
import { useOperator } from '@/services/operatorStore';
import { useTranslation } from 'react-i18next';

const Modal = ({ isModal, setIsModal, talon, queueBranch, serviceList }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);
   const transferTalonToAnotherQueue = useOperator((state) => state.transferTalonToAnotherQueue);
   const getTalonsLoading = useOperator((state) => state.getTalonsLoading);
   const getTalons = useOperator((state) => state.getTalons);
   const { t } = useTranslation();
   const [branch, setBranch] = useState();

   const handleTransferToAnotherQueue = async () => {
      console.log(talon, branch);
      await transferTalonToAnotherQueue(talon.token, branch);
      await getTalons();
      if (!getTalonsLoading) {
         ShowMessage('success', 'Талон успешно перенесен!');
      }
      setIsModal(false);
   };

   const options = queueBranch?.queues?.map((item) => ({
      label: serviceList?.find((service) => service?.id === item.service)?.name,
      value: item?.id,
   }));

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
               options={options}
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
