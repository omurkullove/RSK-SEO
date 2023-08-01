import { Alert, Popover, Select } from 'antd';
import {
   CustomModalLoading,
   MainLanguageOptions,
   getServiceName,
   isDarkModeTrigger,
   transalteIdentifier,
} from '@/utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
   useGetServiceQuery,
   useRemoveServiceMutation,
   useUpdateServiceMutation,
} from '@/api/admin/service_api';

import ModalWrapper from '@/components/admin/ModalWrapper';
import { adminIdentifier } from '@/api/synchronous';
import { alertComponents } from '@/utils/popoverHint';
import i18n from '@/i18next';
import info_icon from '@/assets/svg/Info_icon.svg';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { t } from 'i18next';
import { useGetDocumentQuery } from '@/api/admin/document_api';
import { useGetLanguageQuery } from '@/api/admin/language_api';

const ServiceModal = ({ isServiceModal, setIsServiceModal, service }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [newService, setNewService] = useState(service);

   const { data: languageList, isLoading: isLanguageListLoading } = useGetLanguageQuery();
   const { data: documentList, isLoading: isDocumentListLoadind } = useGetDocumentQuery();
   const { data: serviceList, isLoading: isServiceListLoading } = useGetServiceQuery();

   const [deleteService] = useRemoveServiceMutation();
   const [editService] = useUpdateServiceMutation();

   const dispatch = useDispatch();

   const isSuperAdmin = useSelector((state) => state.toggleDarkMode.isSuperAdmin);

   const handleEdit = (name, value) => {
      let newValue;

      if (name === 'documents') {
         newValue = [...value];
      } else if (name === 'lang_name') {
         newValue = [...value];
      } else {
         newValue = value;
      }

      setNewService((prev) => ({
         ...prev,
         [name]: newValue,
      }));
   };

   const handleSave = async (e) => {
      e.preventDefault();

      await editService(newService);

      setIsServiceModal(false);
   };

   const hanldeDelete = async () => {
      await deleteService(service.id);

      setIsServiceModal(false);
   };

   const { data: translates, isLoading: isTransaltesLoading } = useGetLanguageQuery();

   const TBody = [
      {
         id: 1,
         title: 'ID',
         data: service?.id,
         name: 'id',
         type: 'number',
         hintAlert: <Alert {...alertComponents.idHint} />,
      },
      {
         id: 2,
         title: 'Название',
         data: service?.name ?? '-',
         name: 'name',
         type: 'text',
         hintAlert: <Alert {...alertComponents.stingAny} />,
      },
      {
         id: 3,
         title: 'Cреднее время обслуживания',
         data: service?.average_time,
         name: 'average_time',
         type: 'number',
         hintAlert: <Alert {...alertComponents.numberAny} />,
      },
      {
         id: 4,
         title: 'Авто перенос',
         data: service?.auto_transport,
         name: 'auto_transport',
         type: 'text',
         hintAlert: <Alert {...alertComponents.booleanKey} />,
      },
      {
         id: 5,
         title: 'Услуга для переноса',
         data: service?.service_to_auto_transport,
         name: 'service_to_auto_transport',
         type: 'number',
         hintAlert: <Alert {...alertComponents.selectKeyWord} />,
      },
      {
         id: 6,
         title: 'Ин. язык',
         data: service?.lang_name
            ? languageList?.filter((item) => item.id === service?.lang_name)
            : null,
         name: 'lang_name',
         type: 'number',
      },
      {
         id: 7,
         title: 'Документы',
         data: service?.documents,
         name: 'documents',
         hintAlert: <Alert {...alertComponents.selectKeyWord} />,
      },
   ];

   useEffect(() => {
      dispatch(adminIdentifier());
   }, []);

   const languageOption = MainLanguageOptions(languageList, isDarkMode);

   const serviceOptions = serviceList.map((item) => ({
      label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{getServiceName(item.name)}</p>,
      value: item.id,
   }));

   const documentOptions = documentList?.length
      ? documentList?.map((item) => ({
           label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{item?.name}</p>,
           value: item?.id,
        }))
      : null;

   return (
      <ModalWrapper isOpen={isServiceModal} setIsOpen={setIsServiceModal}>
         <div
            className={styles.serviceMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head} style={isDarkModeTrigger(1, true, isDarkMode)}>
               <input
                  style={isDarkModeTrigger(1, false, isDarkMode)}
                  readOnly
                  defaultValue={service.name}
                  type='text'
                  onChange={(e) => handleEdit('name', e.target.value)}
               />
               <Popover trigger={'hover'} content={<Alert {...alertComponents.stingAny} />}>
                  <img src={info_icon} alt='info' style={{ width: '24px', cursor: 'pointer' }} />
               </Popover>
            </div>

            {isDocumentListLoadind &&
            isLanguageListLoading &&
            isServiceListLoading &&
            isTransaltesLoading ? (
               <CustomModalLoading />
            ) : (
               <form className={styles.body} onSubmit={handleSave} action='submit'>
                  {TBody.map((item) => (
                     <div className={styles.line} key={item.id}>
                        <p style={isDarkModeTrigger(3, false, isDarkMode)}>
                           {t(`admin.serviceModal.${item.name}`)}:
                        </p>

                        {item.name === 'documents' ? (
                           <Select
                              disabled={!isSuperAdmin}
                              mode='multiple'
                              onChange={(value) => handleEdit('documents', value)}
                              style={{ width: '185px', marginRight: '100px' }}
                              options={documentOptions}
                              value={newService.documents}
                              defaultValue={service.documents}
                           />
                        ) : item.name === 'lang_name' ? (
                           <Select
                              mode='multiple'
                              disabled={!isSuperAdmin}
                              onChange={(value) => handleEdit('lang_name', value)}
                              style={{ width: '185px', marginRight: '100px' }}
                              options={languageOption}
                              value={newService.lang_name}
                              defaultValue={service.lang_name}
                           />
                        ) : item.name === 'service_to_auto_transport' ? (
                           <Select
                              onChange={(value) => handleEdit('service_to_auto_transport', value)}
                              style={{ width: '185px', marginRight: '100px' }}
                              options={serviceOptions}
                              defaultValue={service.service_to_auto_transport}
                           />
                        ) : (
                           <input
                              type={item.type}
                              readOnly={item.name === 'id' || !isSuperAdmin ? true : false}
                              defaultValue={
                                 typeof item.data === 'undefined' || item.data === null
                                    ? '-'
                                    : item.data
                              }
                              onChange={(e) => handleEdit(item.name, e.target.value)}
                              style={isDarkModeTrigger(2, false, isDarkMode)}
                           />
                        )}
                        <Popover trigger={'hover'} content={item.hintAlert}>
                           <img
                              src={info_icon}
                              alt='info'
                              style={{ width: '24px', cursor: 'pointer' }}
                           />
                        </Popover>
                     </div>
                  ))}

                  <div className={styles.footer}>
                     {isSuperAdmin ? (
                        <>
                           <button onClick={hanldeDelete} type='button'>
                              {t('buttons.delete')}
                           </button>
                           <button onClick={() => setIsServiceModal(false)} type='button'>
                              {t('buttons.cancel')}
                           </button>
                           <button type='submit'>{t('buttons.save')}</button>
                        </>
                     ) : (
                        <button type='button' onClick={() => setIsServiceModal(false)}>
                           {t('buttons.close')}
                        </button>
                     )}
                  </div>
               </form>
            )}
         </div>
      </ModalWrapper>
   );
};

export default ServiceModal;
