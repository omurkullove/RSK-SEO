import React, { useState } from 'react';
import styles from './ModalWindow.module.scss';
import { ModalForm } from './modalWindow/ModalForm';

export const ModalWindow = () => {
  const [modalActive, setModalActive] = useState(false);

  return (
    <div className={styles.ModalWindow}>
      <button className={styles.newTalon} onClick={() => setModalActive(true)}>Новый талон</button>
      <ModalForm active={modalActive} setActive={setModalActive} />
    </div>
  );
};
