import React from 'react';
import styles from '@/assets/styles/admin/AllModal.module.scss';

const ModalWrapper = ({ children, isOpen, setIsOpen }) => {
   return (
      <div
         className={`${styles.wrapper} ${isOpen ? styles.active : ''}`}
         onClick={() => setIsOpen(false)}
      >
         {children}
      </div>
   );
};

export default ModalWrapper;
