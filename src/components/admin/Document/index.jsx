import { Button, Select, Upload } from 'antd';
import { CustomLoading, MainLanguageOptions, ShowMessage, isDarkModeTrigger } from '@/utils/utils';
import {
   useCreateDocumentMutation,
   useGetDocumentQuery,
   useRemoveDocumentMutation,
} from '@/api/admin/document_api';
import { useEffect, useState } from 'react';

import Checkbox from 'antd/es/checkbox/Checkbox';
import EditDocumentModal from './EditDocumentModal';
import { UploadOutlined } from '@ant-design/icons';
import styles from './Document.module.scss';
import { t } from 'i18next';
import { useGetLanguageQuery } from '@/api/admin/language_api';
import { useSelector } from 'react-redux';

const Document = () => {
   const formData = new FormData();
   const { data: documentList, isLoading: isDocumentsLoading } = useGetDocumentQuery();
   const { data: languageList, isLoading: isLanguageListLoading } = useGetLanguageQuery();
   const [submitDocument] = useCreateDocumentMutation();
   const [deleteDocument] = useRemoveDocumentMutation();

   const [document, setDocument] = useState('');
   const [isEditDocumentModal, setIsEditDocumentModal] = useState(false);
   const [choosedDocument, setChoosedDocument] = useState();

   const [filteredDocuments, setFilteredDocuments] = useState([]);

   const handleCreateDocument = (name, value) => {
      let editedValue;

      if (name === 'file') {
         editedValue = value;
      } else if (name === 'required') {
         editedValue = value;
      } else if (name === 'lang_name') {
         editedValue = [...value];
      } else {
         editedValue = value;
      }

      setDocument((prev) => ({
         ...prev,
         [name]: editedValue,
      }));
   };

   const handleSubmitDocument = async (e) => {
      e.preventDefault();
      if (!document.file || !document.lang_name) {
         ShowMessage('error', 'Заполните поля');
         return;
      } else {
         formData.append('file', document.file);
         formData.append('name', document.name);
         formData.append('required', document.required);
         formData.append('lang_name', document.lang_name);

         await submitDocument(formData);

         setDocument({
            name: '',
            file: null,
            required: false,
            lang_name: [],
         });
      }
   };

   const handleDeleteDocument = async (id) => {
      await deleteDocument(id);
   };

   const handleOpenModal = (id) => {
      setIsEditDocumentModal(true);
      setChoosedDocument(documentList?.find((item) => item.id === id));
   };

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const handleSearch = (value) => {
      const filteredDocuments = documentList?.filter((item) => item?.name.startsWith(value));
      setFilteredDocuments(filteredDocuments);
   };

   useEffect(() => {
      setFilteredDocuments(documentList);
   }, [documentList]);

   const languageOption = MainLanguageOptions(languageList, isDarkMode);

   const fileList = document?.file
      ? [
           {
              ...document?.file,
              thumbUrl: URL.createObjectURL(document?.file),
              name: document?.file?.name,
           },
        ]
      : [];

   return isDocumentsLoading && isLanguageListLoading ? (
      <CustomLoading />
   ) : (
      <div className={styles.documentBlock}>
         <form
            action='submit'
            style={{ backgroundColor: isDarkMode ? '#374B67' : '' }}
            onSubmit={handleSubmitDocument}
         >
            <div className={styles.inputBlock}>
               <p style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {t('admin.documentMain.name')}:
               </p>
               <input
                  required
                  onChange={(e) => handleCreateDocument('name', e.target.value)}
                  type='text'
                  placeholder={t('admin.documentMain.name')}
                  name='name'
                  value={document?.name}
               />
            </div>
            <div className={styles.inputBlock}>
               <p style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {t('admin.documentMain.file')}:
               </p>
               <Upload
                  className={styles.fileInput}
                  beforeUpload={() => false}
                  onChange={(info) => handleCreateDocument('file', info.file)}
                  accept='.pdf, .txt, .doc, .docx'
                  showUploadList={true}
                  fileList={fileList}
                  maxCount={1}
               >
                  <Button icon={<UploadOutlined />} style={isDarkModeTrigger(2, true, isDarkMode)}>
                     {t('admin.documentMain.chooseDocument')}
                  </Button>
               </Upload>
            </div>
            <div className={styles.inputBlock}>
               <p style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {t('admin.documentMain.required')}:
               </p>
               <Checkbox
                  onChange={(e) => handleCreateDocument('required', e.target.checked)}
                  name='required'
                  type='checkbox'
                  checked={document?.required}
               />
            </div>
            <div className={styles.inputBlock}>
               <p style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {t('admin.documentMain.lang_name')}:
               </p>
               <Select
                  dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                  style={{ width: '50%' }}
                  options={languageOption}
                  mode='multiple'
                  onChange={(value) => handleCreateDocument('lang_name', value)}
                  placeholder={t('admin.documentMain.lang_name')}
                  value={document?.lang_name}
               />
            </div>
            <div className={styles.buttonBlock}>
               <button type='submit'>{t('buttons.create')}</button>
            </div>
         </form>

         {isEditDocumentModal && (
            <EditDocumentModal
               isEditDocumentModal={isEditDocumentModal}
               setIsEditDocumentModal={setIsEditDocumentModal}
               documnet={choosedDocument}
            />
         )}

         <center style={{ marginTop: '50px' }} className={styles.center}>
            <input
               style={isDarkModeTrigger(3, true, isDarkMode)}
               placeholder={t('admin.documentMain.searchDocument')}
               onChange={(e) => handleSearch(e.target.value)}
            />
         </center>
         {documentList?.length ? (
            <div className={styles.list}>
               {filteredDocuments?.length ? (
                  filteredDocuments?.map((item) => (
                     <div
                        className={styles.test_doc}
                        key={item.id}
                        style={{ backgroundColor: isDarkMode ? '#374B67' : '' }}
                     >
                        <div
                           className={styles.doc_id}
                           style={isDarkModeTrigger(2, false, isDarkMode)}
                        >
                           ID:{' '}
                           <span style={isDarkModeTrigger(1, false, isDarkMode)}>{item?.id}</span>
                        </div>
                        <div
                           className={styles.doc_name}
                           style={isDarkModeTrigger(2, false, isDarkMode)}
                        >
                           {t('admin.documentMain.name')}:{' '}
                           <span style={isDarkModeTrigger(1, false, isDarkMode)}>{item?.name}</span>
                        </div>

                        <div className={styles.footer}>
                           <a
                              style={isDarkModeTrigger(3, false, isDarkMode)}
                              className={styles.doc_link}
                              href={item?.file}
                              target='_blank'
                              rel='noopener noreferrer'
                           >
                              {t('buttons.open')}
                           </a>

                           <button
                              style={isDarkModeTrigger(3, false, isDarkMode)}
                              onClick={() => handleOpenModal(item.id)}
                              className={styles.doc_link}
                           >
                              {t('buttons.edit')}
                           </button>
                           <button
                              style={isDarkModeTrigger(3, false, isDarkMode)}
                              onClick={() => handleDeleteDocument(item.id)}
                              className={styles.doc_link}
                           >
                              {t('buttons.delete')}
                           </button>
                        </div>
                     </div>
                  ))
               ) : (
                  <div className='searchUndefinedBlock'>
                     <h1>{t('searchUndefinedBlockfined')}</h1>
                  </div>
               )}
            </div>
         ) : (
            t('noData')
         )}
      </div>
   );
};

export default Document;
