import { CustomLoading, cityTransalte, isDarkModeTrigger } from '@/utils/utils';

import BranchModal from './BranchModal';
import CreateBranchModal from './CreateBranchModal';
import styles from './Branch.module.scss';
import { t } from 'i18next';
import { useGetBranchQuery } from '@/api/admin/branch_api';
import { useGetLanguageQuery } from '@/api/admin/language_api';
import { useGetServiceQuery } from '@/api/admin/service_api';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Branch = () => {
   const isSuperAdmin = useSelector((state) => state.toggleDarkMode.isSuperAdmin);

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [isModal, setIsModal] = useState(false);
   const [isCreateModal, setIsCreateModal] = useState(false);

   const [choosedBranch, setChoosedBranch] = useState();

   const { data: branchList, isLoading: isBranchListLoading } = useGetBranchQuery();
   const { data: serviceList, isLoading: isServiceListLoading } = useGetServiceQuery();
   const { data: languageList, isLoading: isLanguageListLoading } = useGetLanguageQuery();

   const handleOpenModal = (id) => {
      setChoosedBranch((prev) => branchList?.find((item) => item.id === id));
      setIsModal(true);
   };

   return isBranchListLoading && isServiceListLoading && isLanguageListLoading ? (
      <CustomLoading />
   ) : (
      <>
         <div
            className={styles.branchBlock}
            style={{ backgroundColor: isDarkMode ? '#001F31' : '' }}
         >
            <div className={styles.head}>
               <p style={{ color: isDarkMode ? 'white' : '' }}>{t('admin.titles.branchs')}</p>
            </div>
            <div className={styles.body}>
               {branchList?.length ? (
                  branchList?.map((item) => (
                     <div
                        key={item.id}
                        onClick={() => handleOpenModal(item.id)}
                        style={{
                           backgroundColor: isDarkMode ? '#374B67' : '',
                           color: isDarkMode ? 'white' : '',
                        }}
                     >
                        {`${cityTransalte(item?.city)}, ${item?.address}`}
                     </div>
                  ))
               ) : (
                  <h1 style={isDarkModeTrigger(1, false, isDarkMode)}>{t('nothingAtTheMoment')}</h1>
               )}
            </div>
            {isSuperAdmin ? (
               <div className={styles.footer}>
                  <button onClick={() => setIsCreateModal(true)}>{t('buttons.create')}</button>
               </div>
            ) : null}
         </div>
         {isModal && (
            <BranchModal
               isModal={isModal}
               setIsModal={setIsModal}
               branch={choosedBranch}
               serviceList={serviceList}
               languageList={languageList}
            />
         )}
         {isCreateModal && (
            <CreateBranchModal
               isCreateModal={isCreateModal}
               setIsCreateModal={setIsCreateModal}
               serviceList={serviceList}
               languageList={languageList}
               branchList={branchList}
            />
         )}
      </>
   );
};

export default Branch;
