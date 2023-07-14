import { Checkbox, Select } from 'antd';
import { CustomModalLoading, selectModalStyles } from '@/utils/utils';
import React, { useState } from 'react';

import ModalWrapper from '../../ModalWrapper';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { useAdmin } from '@/services/adminStore';
import { useMain } from '@/services/MainStore';

const EditDocumentModal = ({ isEditDocumentModal, setIsEditDocumentModal, documnet }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);

   const editDocument = useAdmin((state) => state.editDocument);
   const getDocuments = useAdmin((state) => state.getDocuments);

   const [newDocument, setNewDocument] = useState(documnet);

   const forData = new FormData();

   const handleEdit = (name, value) => {
      setNewDocument((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSave = async (e) => {
      e.preventDefault();
      forData.append('file', newDocument.file);
      forData.append('name', newDocument.name);
      forData.append('required', newDocument.required);

      await editDocument(documnet.id, forData);
      await getDocuments();
   };

   return (
      <ModalWrapper isOpen={isEditDocumentModal} setIsOpen={setIsEditDocumentModal}>
         <div
            className={styles.editDocumentMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head}>
               <p>Создать очередь</p>
            </div>
            <form action='submit' onSubmit={handleSave}>
               <input
                  onChange={(e) => handleEdit('name', e.target.value)}
                  type='string'
                  placeholder='Название'
                  defaultValue={documnet.name}
               />

               <input
                  required
                  type='file'
                  name='file'
                  accept='.pdf, .txt, .doc, .docx'
                  onChange={(e) => handleEdit('file', e.target.files[0])}
               />
               <Checkbox
                  onChange={(e) => handleEdit('required', e.target.checked)}
                  name='required'
                  type='checkbox'
                  defaultChecked={documnet.required}
               />

               <div className={styles.footer}>
                  <button onClick={() => setIsEditDocumentModal(false)} type='button'>
                     Отмена
                  </button>
                  <button type='submit'>Сохранить</button>
               </div>
            </form>
         </div>
      </ModalWrapper>
   );
};

export default EditDocumentModal;
