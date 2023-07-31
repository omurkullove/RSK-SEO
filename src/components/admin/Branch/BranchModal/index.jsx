import { Alert, Popover, Select } from 'antd';
import {
   MainServiceOptions,
   cityTransalte,
   isDarkModeTrigger,
   serviceIndetificator,
} from '@/utils/utils';
import {
   useGetBranchQuery,
   useRemoveBranchMutation,
   useUpdateBranchMutation,
} from '@/api/admin/branch_api';

import ModalWrapper from '../../ModalWrapper';
import { alertComponents } from '@/utils/popoverHint';
import info_icon from '@/assets/svg/Info_icon.svg';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const BranchModal = ({ isModal, setIsModal, branch, serviceList, languageList }) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const isSuperAdmin = useSelector((state) => state.toggleDarkMode.isSuperAdmin);

   const { data: branchList, isLoading: isBranchListLoading } = useGetBranchQuery();
   const [editBranch] = useUpdateBranchMutation();
   const [deleteBranch] = useRemoveBranchMutation();

   const [newBranch, setNewBranch] = useState({
      ...branch,
      // work_time_start: returnUnderstandableDate(branch.work_time_start),
      // work_time_end: returnUnderstandableDate(branch.work_time_end),
   });

   const TBody = [
      {
         hintAlert: <Alert {...alertComponents.idHint} />,
         id: 1,
         title: 'ID',
         data: branch.id,
         name: 'id',
      },
      {
         hintAlert: <Alert {...alertComponents.stingAny} />,
         id: 2,
         title: 'City',
         data: cityTransalte(branch.city),
         name: 'city',
      },
      {
         hintAlert: <Alert {...alertComponents.stingAny} />,
         id: 3,
         title: 'Address',
         data: branch.address,
         name: 'address',
      },
      {
         hintAlert: <Alert {...alertComponents.selectKeyWord} />,
         id: 4,
         title: 'Services',
         data: branch.service,
         name: 'service',
      },
      {
         hintAlert: <Alert {...alertComponents.selectKeyWord} />,
         id: 9,
         title: 'Language',
         data: branch.language,
         name: 'lang_name',
      },
      {
         hintAlert: <Alert {...alertComponents.dataKeyText} />,
         id: 5,
         title: 'Work start time',
         data: branch.work_time_start ? branch.work_time_start : undefined,
         name: 'work_time_start',
      },
      {
         hintAlert: <Alert {...alertComponents.dataKeyText} />,
         id: 6,
         title: 'Work end time',
         data: branch.work_time_end ? branch.work_time_end : undefined,
         name: 'work_time_end',
      },
   ];

   const languageOptions = languageList?.map((item) => ({
      key: item.id,
      label: <p style={isDarkModeTrigger(3, false, isDarkMode)}>{item.text}</p>,
      value: item.id,
   }));

   const handleEdit = (name, value) => {
      if (name === 'service' || name === 'lang_name') {
         setNewBranch((prev) => ({
            ...prev,
            [name]: [...value],
         }));
      } else {
         setNewBranch((prev) => ({
            ...prev,
            [name]: value,
         }));
      }
   };

   const handleSave = async (e) => {
      e.preventDefault();

      await editBranch(newBranch);

      setIsModal(false);
   };

   const handleDelete = async (id) => {
      await deleteBranch(id);
   };

   const serviceOptions = MainServiceOptions(serviceList, isDarkMode);

   return (
      <ModalWrapper isOpen={isModal} setIsOpen={setIsModal}>
         <div
            className={styles.branchMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head} style={isDarkModeTrigger(3, true, isDarkMode)}>
               <p style={isDarkModeTrigger(1, false, isDarkMode)}>Филиал</p>
            </div>
            <form className={styles.body} onSubmit={handleSave} action='submit'>
               {TBody?.map((item) => (
                  <div className={styles.line} key={item.id}>
                     <p style={isDarkModeTrigger(3, false, isDarkMode)}>
                        {t(`admin.branchMain.${item?.name}`)}
                     </p>
                     {item.name === 'service' ? (
                        <Select
                           dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                           mode='multiple'
                           value={newBranch.service}
                           onChange={(value) => handleEdit('service', value)}
                           disabled={!isSuperAdmin}
                           options={serviceOptions}
                           defaultValue={serviceIndetificator(serviceList, branch.service)}
                           style={{ width: '185px', marginRight: '100px' }}
                        />
                     ) : item.name === 'lang_name' ? (
                        <Select
                           dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                           mode='multiple'
                           value={newBranch.lang_name}
                           onChange={(value) => handleEdit('lang_name', value)}
                           disabled={!isSuperAdmin}
                           options={languageOptions}
                           defaultValue={newBranch.lang_name}
                           style={{ width: '185px', marginRight: '100px' }}
                        />
                     ) : (
                        <input
                           style={isDarkModeTrigger(1, false, isDarkMode)}
                           readOnly={item.name === 'id' || !isSuperAdmin ? true : false}
                           name={item.name}
                           defaultValue={typeof item.data === 'undefined' ? '-' : item.data}
                           onChange={(e) => handleEdit(item.name, e.target.value)}
                        />
                     )}
                     <Popover content={item.hintAlert} trigger={'hover'}>
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
                        <button onClick={() => handleDelete(newQueue.id)} type='button'>
                           {t('buttons.delete')}
                        </button>
                        <button onClick={() => setIsModal(false)} type='button'>
                           {t('buttons.cancel')}
                        </button>
                        <button type='submit'>{t('buttons.save')}</button>
                     </>
                  ) : (
                     <button onClick={() => setIsModal(false)} type='button'>
                        {t('buttons.close')}
                     </button>
                  )}
               </div>
            </form>
         </div>
      </ModalWrapper>
   );
};

export default BranchModal;
