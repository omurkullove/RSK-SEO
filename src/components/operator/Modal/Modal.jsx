import { Select } from 'antd';
import { getServiceName } from '@/utils/utils';
import styles from '@/assets/styles/operator/Modal.module.scss';
import { useLazyTransferTalonQueueQuery } from '@/api/operator/operator_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Modal = ({ isModal, setIsModal, talon, queueBranch, serviceList, refetch }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const { t } = useTranslation();
   const [queue, setQueue] = useState();

   const [transferTalonToAnotherQueue] = useLazyTransferTalonQueueQuery();

   const handleTransferToAnotherQueue = async () => {
      const body = {
         talonId: talon?.token,
         queueId: queue,
      };

      await transferTalonToAnotherQueue(body);
      await refetch();

      setIsModal(false);
   };

   const options = queueBranch?.queues?.map((item) => ({
      label: getServiceName(serviceList?.find((service) => service?.id === item.service)?.name),
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
            <p>{t('modal.chooseQueue')}</p>
            <Select
               style={{ width: '100%' }}
               dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
               className={''}
               placeholder={t('modal.chooseQueue')}
               options={options}
               onChange={(value) => setQueue(value)}
               size='large'
            />
            <div className={styles.buttonBlock}>
               <button onClick={() => setIsModal(false)}>{t('buttons.cancel')}</button>
               <button onClick={() => handleTransferToAnotherQueue()}>
                  {t('buttons.transfer')}
               </button>
            </div>
         </div>
      </div>
   );
};

export default Modal;
