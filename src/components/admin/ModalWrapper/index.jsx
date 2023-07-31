import styles from '@/assets/styles/admin/AllModal.module.scss';

const ModalWrapper = ({ children, isOpen, setIsOpen, stop }) => {
   return (
      <div
         className={`${styles.wrapper} ${isOpen ? styles.active : ''}`}
         onClick={() => (stop ? '' : setIsOpen(false))}
      >
         {children}
      </div>
   );
};

export default ModalWrapper;
