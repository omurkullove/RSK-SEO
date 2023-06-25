import React from 'react';
import styles from './ModalForm.module.scss';

export const ModalForm = ({ active, setActive }) => {
  return (
    <div className={`${styles.modal} ${active ? styles.active : ''}`} onClick={() => setActive(false)}>
      <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
        {/* Add your modal content here */}
      </div>
    </div>
  );
};
