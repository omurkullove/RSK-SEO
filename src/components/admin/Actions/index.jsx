import {
   CustomLoading,
   branchIndeficator,
   cityTransalte,
   employeeIdetificator,
   isDarkModeTrigger,
} from '@/utils/utils';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useGetActionQuery, useRemoveActionMutation } from '@/api/admin/action_api';

import moment from 'moment';
import styles from './Actions.module.scss';
import { t } from 'i18next';
import { useGetBranchQuery } from '@/api/admin/branch_api';
import { useGetEmployeeListQuery } from '@/api/admin/employee_api';
import { useSelector } from 'react-redux';

const Actions = () => {
   const { data: actions, isLoading: isActionsLoadinng } = useGetActionQuery();
   const { data: branchList, isLoading: isBranchListLoading } = useGetBranchQuery();
   const { employeeList, isLoading: isEmployeeListLoading } = useGetEmployeeListQuery();
   const [deleteActions] = useRemoveActionMutation();

   const [searchActions, setSearchActions] = useState([]);
   const [currentBranch, setCurrentBranch] = useState('all');

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const handleDelete = async (id) => {
      await deleteActions(id);
   };

   const handleSearch = (value) => {
      if (value === '') {
         if (currentBranch === 'all') {
            setSearchActions(actions);
         } else {
            const filteredValue = actions.filter((item) => item.branch === currentBranch);
            setSearchActions(filteredValue);
         }
      } else {
         const searchValue = value.trim().toLowerCase().toString();
         if (currentBranch === 'all') {
            const filteredValue = actions.filter((item) =>
               item.action.toLowerCase().includes(searchValue)
            );
            setSearchActions(filteredValue);
         } else {
            const filteredValue = actions.filter(
               (item) =>
                  item.action.toLowerCase().includes(searchValue) && item.branch === currentBranch
            );
            setSearchActions(filteredValue);
         }
      }
   };

   const handleFilter = (value) => {
      setCurrentBranch(value);
      if (value === 'all') {
         setSearchActions(actions);
      } else {
         setSearchActions(actions.filter((item) => item.branch == value));
      }
   };

   useEffect(() => {
      setSearchActions(actions?.reverse());
   }, [actions]);

   return isActionsLoadinng ? (
      <CustomLoading />
   ) : (
      <div className={styles.actionsContainer}>
         <div className={styles.column}>
            {actions?.length ? (
               searchActions?.length ? (
                  searchActions?.map((action) => (
                     <div
                        className={styles.actionCard}
                        key={action?.id}
                        style={isDarkModeTrigger(1, false, isDarkMode)}
                     >
                        <div className={styles.timestamp}>
                           {moment(action?.registerd_time).format('lll')}
                        </div>
                        <div className={styles.content}>
                           <span className={styles.actionType}>{action?.action}</span>
                           <span className={styles.branch}>
                              {t('admin.actions.branch')}:{' '}
                              {branchIndeficator(branchList, action?.branch)}
                           </span>
                           <span className={styles.employee}>
                              {t('admin.actions.employee')}:{' '}
                              {employeeIdetificator(employeeList, action?.employee)}
                           </span>
                        </div>
                        <button
                           className={styles.deleteButton}
                           onClick={() => handleDelete(action?.id)}
                        >
                           <DeleteOutlined style={{ color: isDarkMode ? 'white' : 'red' }} />
                        </button>
                     </div>
                  ))
               ) : (
                  <div className='searchUndefinedBlock'>
                     <h1>{t('searchUndefinedBlockfined')}</h1>
                  </div>
               )
            ) : (
               <h1>{t('noData')}</h1>
            )}
         </div>
         <div className={styles.column}>
            <div className={styles.searchBar}>
               <input
                  style={isDarkModeTrigger(1, false, isDarkMode)}
                  type='text'
                  placeholder={t('admin.actions.actionSearch')}
                  onChange={(e) => handleSearch(e.target.value)}
                  className={styles.searchInput}
               />
               <button className={styles.searchButton}>
                  <SearchOutlined style={{ color: '#1e4a89' }} />
               </button>
            </div>

            <div className={styles.filterBlock}>
               <button
                  onClick={() => handleFilter('all')}
                  style={{ backgroundColor: currentBranch === 'all' ? '#2f78df' : '' }}
               >
                  {t('admin.actions.allBranches')}
               </button>
               {branchList?.map((item) => (
                  <button
                     key={item.id}
                     onClick={() => handleFilter(item?.id)}
                     style={{ backgroundColor: currentBranch === item.id ? '#2f78df' : '' }}
                  >{`${cityTransalte(item?.city)}, ${item?.address}`}</button>
               ))}
            </div>
         </div>
      </div>
   );
};

export default Actions;
