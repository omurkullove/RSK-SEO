import { Checkbox, Select } from 'antd';
import {
   CustomModalLoading,
   MainDocumentOptions,
   MainLanguageOptions,
   MainServiceOptions,
   isDarkModeTrigger,
   selectModalStyles,
} from '@/utils/utils';
import { useCreateServiceMutation, useGetServiceQuery } from '@/api/admin/service_api';

import ModalWrapper from '@/components/admin/ModalWrapper';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { t } from 'i18next';
import { useGetDocumentQuery } from '@/api/admin/document_api';
import { useGetLanguageQuery } from '@/api/admin/language_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CreateServiceModal = ({ isCreateServiceModal, setIsCreateServiceModal }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [service, setService] = useState();

   const { data: documentList, isLoading: isDocumentListLoading } = useGetDocumentQuery();
   const { data: serviceList, isLoading: isServiceListLoading } = useGetServiceQuery();
   const { data: languageList, isLoading: isLanguageListLoading } = useGetLanguageQuery();
   const [createService] = useCreateServiceMutation();

   const handleEdit = (name, value) => {
      let newValue;
      if (name === 'documents' || name === 'lang_name') {
         newValue = [...value];
      } else {
         newValue = value;
      }

      setService((prev) => ({
         ...prev,
         [name]: newValue,
      }));
   };

   const handleCreateService = async (e) => {
      e.preventDefault();
      await createService(service);
      setIsCreateServiceModal(false);
   };

   const documentOptions = MainDocumentOptions(documentList, isDarkMode);

   const languageOption = MainLanguageOptions(languageList, isDarkMode);

   const serviceOptions = MainServiceOptions(serviceList, isDarkMode);

   return (
      <ModalWrapper isOpen={isCreateServiceModal} setIsOpen={setIsCreateServiceModal}>
         <div
            className={styles.createServiceMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head} style={isDarkModeTrigger(1, true, isDarkMode)}>
               <p style={isDarkModeTrigger(1, false, isDarkMode)}>{t('buttons.createService')}</p>
            </div>
            <form action='submit' onSubmit={handleCreateService}>
               {isDocumentListLoading && isServiceListLoading && isLanguageListLoading ? (
                  <CustomModalLoading />
               ) : (
                  <>
                     <input
                        style={isDarkModeTrigger(1, false, isDarkMode)}
                        onChange={(e) => handleEdit('name', e.target.value)}
                        required
                        type='string'
                        placeholder={t('admin.serviceModal.name')}
                     />
                     <input
                        style={isDarkModeTrigger(1, false, isDarkMode)}
                        onChange={(e) => handleEdit('number', e.target.value)}
                        name='average_time'
                        type='number'
                        placeholder={t('admin.serviceModal.average_time')}
                     />

                     <p style={{ marginTop: '20px' }}>Авто перенос талона</p>
                     <Checkbox
                        style={isDarkModeTrigger(1, false, isDarkMode)}
                        onChange={(e) => handleEdit('auto_transport', e.target.checked)}
                        placeholder={t('admin.serviceModal.auto_transport')}
                     />

                     <Select
                        dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                        onChange={(value) => handleEdit('service_to_auto_transport', value)}
                        style={{ ...selectModalStyles }}
                        bordered={false}
                        options={serviceOptions}
                        placeholder={'Выбрать улсугу  для переноса'}
                     />

                     <Select
                        dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                        mode='multiple'
                        onChange={(value) => handleEdit('lang_name', value)}
                        style={{ ...selectModalStyles }}
                        bordered={false}
                        options={languageOption}
                        placeholder={t('admin.serviceModal.lang_name')}
                     />

                     <Select
                        dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                        mode='multiple'
                        onChange={(value) => handleEdit('documents', value)}
                        required
                        placeholder={t('admin.serviceModal.documents')}
                        bordered={false}
                        options={documentOptions}
                        style={selectModalStyles}
                     />
                  </>
               )}

               <div className={styles.footer}>
                  <button onClick={() => setIsCreateServiceModal(false)} type='button'>
                     {t('buttons.cancel')}
                  </button>
                  <button type='submit'>{t('buttons.create')}</button>
               </div>
            </form>
         </div>
      </ModalWrapper>
   );
};

export default CreateServiceModal;
