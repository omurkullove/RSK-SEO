import {
   CustomLoading,
   ShowMessage,
   branchIndeficator,
   cityTransalte,
   isDarkModeTrigger,
} from '@/utils/utils';
import {
   useCreateWindowMutation,
   useGetWindowQuery,
   useRemoveWindowMutation,
} from '@/api/admin/window_api';
import { useEffect, useState } from 'react';

import EditModal from './EditModal';
import { Select } from 'antd';
import styles from './Window.module.scss';
import { t } from 'i18next';
import { useGetBranchQuery } from '@/api/admin/branch_api';
import { useSelector } from 'react-redux';

const Window = () => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const { data: windowList, isLoading: isWindowListLoading, refetch } = useGetWindowQuery();
   const { data: branchList, isLoading: isBranchListLoading } = useGetBranchQuery();

   const [createWindow] = useCreateWindowMutation();
   const [deleteWindow] = useRemoveWindowMutation();

   const createOptions = branchList?.map((item) => ({
      label: (
         <p style={isDarkModeTrigger(3, false, isDarkMode)}>{`${cityTransalte(item?.city)}, ${
            item?.address
         }`}</p>
      ),
      value: item?.id,
   }));
   const filterOptions = [...createOptions, { label: t('all'), value: 'all' }];

   const [window, setWindow] = useState();
   const [searchWindow, setSearchWindow] = useState([]);
   const [currentBranch, setCurrentBranch] = useState('all');

   const [isModal, setIsModal] = useState(false);
   const [currentWindow, setCurrentWindow] = useState();

   const handleEdit = (name, value) => {
      setWindow((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!window.branch) {
         ShowMessage('warning', 'Филиал не выбран');
         return;
      }

      await createWindow(window);
      await refetch();

      setWindow('');
   };

   const handleSearch = (value) => {
      if (value === '') {
         if (currentBranch === 'all') {
            setSearchWindow(windowList);
         } else {
            const filteredValue = windowList.filter((item) => item.branch === currentBranch);
            setSearchWindow(filteredValue);
         }
      } else {
         const searchValue = value.toString(); // Convert value to string
         if (currentBranch === 'all') {
            const filteredValue = windowList.filter((item) =>
               item.number.toString().startsWith(searchValue)
            );
            setSearchWindow(filteredValue);
         } else {
            const filteredValue = windowList.filter(
               (item) =>
                  item.number.toString().startsWith(searchValue) && item.branch === currentBranch
            );
            setSearchWindow(filteredValue);
         }
      }
   };

   const handleFilter = (value) => {
      setCurrentBranch(value);
      if (value === 'all') {
         setSearchWindow(windowList);
      } else {
         setSearchWindow(windowList.filter((item) => item.branch == value));
      }
   };

   const handleDelete = async (id) => {
      await deleteWindow(id);
   };

   const handleOpenModal = (id) => {
      setIsModal(true);
      setCurrentWindow(windowList.find((item) => item.id === id));
   };

   useEffect(() => {
      setSearchWindow(windowList);
   }, [windowList]);

   return isWindowListLoading && isBranchListLoading ? (
      <CustomLoading />
   ) : (
      <div className={styles.windowBlock}>
         <form
            action='submit'
            style={{ backgroundColor: isDarkMode ? '#374B67' : '' }}
            onSubmit={handleSubmit}
         >
            <div className={styles.inputBlock}>
               <p style={isDarkModeTrigger(1, false, isDarkMode)}>{t('admin.windowMain.branch')}</p>
               <Select
                  dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
                  options={createOptions}
                  style={{ width: '50%' }}
                  onChange={(value) => handleEdit('branch', value)}
                  value={window?.branch}
                  placeholder={t('admin.windowMain.branch')}
               />
            </div>
            <div className={styles.inputBlock}>
               <p style={isDarkModeTrigger(1, false, isDarkMode)}>
                  {t('admin.windowMain.windowNumber')}
               </p>
               <input
                  style={isDarkModeTrigger(1, false, isDarkMode)}
                  required
                  placeholder={t('admin.windowMain.windowNumber')}
                  onChange={(e) => handleEdit('number', e.target.value)}
                  value={window?.number || ''}
               />
            </div>

            <div className={styles.buttonBlock}>
               <button type='submit'>{t('buttons.create')}</button>
            </div>
         </form>

         {isModal ? (
            <EditModal
               isModal={isModal}
               setIsModal={setIsModal}
               window={currentWindow}
               refetch={refetch}
            />
         ) : null}

         <center className={styles.center}>
            <input
               placeholder={t('admin.windowMain.searchWindow')}
               style={isDarkModeTrigger(1, false, isDarkMode)}
               onChange={(e) => handleSearch(e.target.value)}
            />
            <Select
               dropdownStyle={isDarkModeTrigger(2, true, isDarkMode)}
               options={filterOptions}
               defaultValue={filterOptions[filterOptions.length - 1]}
               style={{ width: '180px' }}
               onChange={(value) => handleFilter(value)}
            />
         </center>
         {windowList.length ? (
            <div className={styles.windowList}>
               {searchWindow.length ? (
                  searchWindow?.map((item) => (
                     <div
                        key={item?.id}
                        className={styles.windowChildBlock}
                        style={isDarkModeTrigger(2, true, isDarkMode)}
                     >
                        <div>
                           <h5 style={isDarkModeTrigger(2, false, isDarkMode)}>ID:</h5>
                           <p style={isDarkModeTrigger(1, false, isDarkMode)}>{item?.id}</p>
                        </div>
                        <div>
                           <h5 style={isDarkModeTrigger(2, false, isDarkMode)}>
                              {t('admin.windowMain.windowNumber')}
                           </h5>
                           <p style={isDarkModeTrigger(1, false, isDarkMode)}>{item?.number}</p>
                        </div>

                        <div>
                           <h5 style={isDarkModeTrigger(2, false, isDarkMode)}>
                              {t('admin.windowMain.branch')}
                           </h5>
                           <p style={isDarkModeTrigger(1, false, isDarkMode)}>
                              {branchIndeficator(branchList, item?.branch)}
                           </p>
                        </div>
                        <div className={styles.footer}>
                           <button
                              onClick={() => handleDelete(item?.id)}
                              type='button'
                              style={isDarkModeTrigger(3, false, isDarkMode)}
                           >
                              {t('buttons.delete')}
                           </button>
                           <button
                              onClick={() => handleOpenModal(item?.id)}
                              style={isDarkModeTrigger(3, false, isDarkMode)}
                           >
                              {t('buttons.edit')}
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
            <h1>{t('noData')}</h1>
         )}
      </div>
   );
};

export default Window;
