import { Button, Checkbox, Select, Upload } from 'antd';
import { MainLanguageOptions, ShowMessage, isDarkModeTrigger } from '@/utils/utils';

import ModalWrapper from '../../ModalWrapper';
import { UploadOutlined } from '@ant-design/icons';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { t } from 'i18next';
import { useGetLanguageQuery } from '@/api/admin/language_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useUpdateDocumentMutation } from '@/api/admin/document_api';

const EditDocumentModal = ({ isEditDocumentModal, setIsEditDocumentModal, documnet }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [editDocument] = useUpdateDocumentMutation();
   const { data: languageList, isLoading: isLanguageListLoading } = useGetLanguageQuery();

   const [newDocument, setNewDocument] = useState(documnet);

   const [isFileChanged, setIsFileChanged] = useState(false);

   const formData = new FormData();

   const handleEdit = (name, value) => {
      if (name === 'file') {
         setNewDocument((prev) => ({
            ...prev,
            [name]: value,
         }));
         setIsFileChanged(true);
      } else if (name === 'lang_name') {
         setNewDocument((prev) => ({
            ...prev,
            [name]: [...value],
         }));
      } else {
         setNewDocument((prev) => ({
            ...prev,
            [name]: value,
         }));
      }
   };

   const handleSave = async (e) => {
      e.preventDefault();

      formData.append('name', newDocument.name);
      formData.append('required', newDocument.required);
      formData.append('lang_name', newDocument.lang_name);

      if (isFileChanged) {
         formData.append('file', newDocument.file);
      }

      if (!newDocument.file) {
         ShowMessage('warning', 'Выберите файл');
         return;
      }

      const body = {
         data: formData,
         id: documnet.id,
      };

      await editDocument(body);

      setIsEditDocumentModal(false);
   };

   const fileCutter = (url) => {
      if (url) {
         const result = url.substring(url.lastIndexOf('/media/') + '/media/'.length);
         return result;
      }
      return;
   };

   const decodedFile = newDocument?.file ? decodeURIComponent(newDocument?.file) : '';
   const languageOption = MainLanguageOptions(languageList, isDarkMode);

   const fileList = newDocument?.file
      ? typeof newDocument?.file === 'string'
         ? [
              {
                 uid: '-1',
                 name: fileCutter(decodedFile),
                 status: 'done',
                 url: newDocument?.file,
                 thumbUrl: newDocument?.file,
              },
           ]
         : [
              {
                 ...newDocument?.file,
                 thumbUrl: URL.createObjectURL(newDocument?.file),
                 name: newDocument?.file?.name,
              },
           ]
      : [];

   return (
      <ModalWrapper isOpen={isEditDocumentModal} setIsOpen={setIsEditDocumentModal}>
         <div
            className={styles.editDocumentMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head} style={isDarkModeTrigger(3, true, isDarkMode)}>
               <p style={isDarkModeTrigger(1, false, isDarkMode)}>{t('buttons.createDocument')}</p>
            </div>
            <form
               action='submit'
               onSubmit={handleSave}
               style={isDarkModeTrigger(2, true, isDarkMode)}
            >
               <label htmlFor='name' style={isDarkModeTrigger(2, false, isDarkMode)}>
                  {t('admin.documentMain.name')}
                  <div style={{ width: '205px' }}>
                     <input
                        id='name'
                        onChange={(e) => handleEdit('name', e.target.value)}
                        type='string'
                        placeholder={t('admin.documentMain.name')}
                        defaultValue={documnet.name}
                     />
                  </div>
               </label>

               <label htmlFor='file' style={isDarkModeTrigger(2, false, isDarkMode)}>
                  {t('admin.documentMain.file')}

                  <div style={{ width: '205px' }}>
                     <Upload
                        id='file'
                        beforeUpload={() => false}
                        onChange={(info) => handleEdit('file', info.fileList[0].originFileObj)}
                        accept='.pdf, .txt, .doc, .docx'
                        showUploadList={true}
                        fileList={fileList}
                        onRemove={() => handleEdit('file', null)}
                        customRequest={() => {}}
                        maxCount={1}
                     >
                        <Button
                           icon={<UploadOutlined />}
                           style={isDarkModeTrigger(2, true, isDarkMode)}
                        >
                           {t('admin.documentMain.chooseDocument')}
                        </Button>
                     </Upload>
                  </div>
               </label>

               <label htmlFor='required' style={isDarkModeTrigger(2, false, isDarkMode)}>
                  {t('admin.documentMain.required')}

                  <div style={{ width: '205px' }}>
                     <Checkbox
                        id='required'
                        onChange={(e) => handleEdit('required', e.target.checked)}
                        name='required'
                        type='checkbox'
                        checked={newDocument.required}
                     />
                  </div>
               </label>

               <label htmlFor='lang_name' style={isDarkModeTrigger(2, false, isDarkMode)}>
                  {t('admin.documentMain.lang_name')}

                  <div style={{ width: '205px' }}>
                     <Select
                        dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                        style={{ width: '100%' }}
                        options={languageOption}
                        mode='multiple'
                        onChange={(value) => handleEdit('lang_name', value)}
                        defaultValue={documnet.lang_name}
                        placeholder={t('chooseLanguage')}
                     />
                  </div>
               </label>

               <div className={styles.footer}>
                  <button onClick={() => setIsEditDocumentModal(false)} type='button'>
                     {t('buttons.cancel')}
                  </button>
                  <button type='submit'>{t('buttons.save')}</button>
               </div>
            </form>
         </div>
      </ModalWrapper>
   );
};

export default EditDocumentModal;
