import React, { useEffect, useState } from 'react';

import ModalWrapper from '@/components/admin/ModalWrapper';
import moment from 'moment';
import styles from './ShiftModal.module.scss';
import { t } from 'i18next';
import { useLazyShiftEmployeeQuery } from '@/api/general/auth_api';

const ShiftModal = ({ isModal, setIsModal, refetch }) => {
   const [isRunning, setIsRunning] = useState(true);
   const [startTime, setStartTime] = useState(moment());
   const [elapsedTime, setElapsedTime] = useState(0);

   const [shifEmployee] = useLazyShiftEmployeeQuery();

   useEffect(() => {
      let timer;

      if (isRunning) {
         timer = setInterval(() => {
            const now = moment();
            const diffInSeconds = now.diff(startTime, 'seconds');
            setElapsedTime(diffInSeconds);
         }, 1000);
      }

      return () => {
         clearInterval(timer);
      };
   }, [isRunning, startTime]);

   const handleStop = async () => {
      await shifEmployee();
      await refetch();
      setIsModal(false);
      setIsRunning(false);
   };
   return (
      <ModalWrapper isOpen={isModal} setIsOpen={setIsModal} stop={true}>
         <div onClick={(e) => e.stopPropagation()} className={styles.main}>
            <div className={styles.watch}>{moment.utc(elapsedTime * 1000).format('HH:mm:ss')}</div>
            <button onClick={handleStop}>{t('shiftOff')}</button>
         </div>
      </ModalWrapper>
   );
};

export default ShiftModal;
