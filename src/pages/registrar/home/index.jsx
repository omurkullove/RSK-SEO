import { Popover, Spin, Table } from 'antd';
import {
   ShowMessage,
   branchIndeficator,
   canceledClientsCounter,
   clientTypeTranslate,
   clientsCounter,
   getServiceName,
   isAuthenticated,
   returnUnderstandableDate,
   timeLimitSeconds,
} from '@/utils/utils';
import {
   useGetBranchListQuery,
   useGetTalonQuery,
   useLazyDeleteTalonQuery,
} from '@/api/registrar/registrar_api';

import { LoadingOutlined } from '@ant-design/icons';
import MainLayout from '@/components/Main/Layout';
import { ModalForm } from '@/components/registrar/ModalWindow/ModalForm';
import { UserHeader } from '@/components/registrar/Navbar/Navbar-1-7';
import alert from '@/assets/svg/1_6Alert.svg';
import arrowGreen from '@/assets/svg/arrowGreen.svg';
import arrowRed from '@/assets/svg/arrowRed.svg';
import { calculateTimeDifference } from '@/utils/utils';
import darkModeAlert from '@/assets/svg/darkModeAlert.svg';
import darkModeArrowGreen from '@/assets/svg/darkModeArrowGreen.svg';
import darkModeArrowRed from '@/assets/svg/darkModeArrowRed.svg';
import darkModeDots from '@/assets/svg/darkModeDots.svg';
import dots from '@/assets/svg/dots.svg';
import styles from '@/assets/styles/registrar/Main.module.scss';
import { useEffect } from 'react';
import { useGetProfileInfoQuery } from '@/api/general/auth_api';
import { useGetServiceQuery } from '@/api/admin/service_api';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RegistrarHome = () => {
   const { t } = useTranslation();

   const { data: employee, isLoading: getProfileInfoLoading } = useGetProfileInfoQuery();
   const { data: talons, isLoading: getTalonsLoading, refetch } = useGetTalonQuery();

   const { data: serviceList, isLoading: isServiceListLoading } = useGetServiceQuery();
   const { data: branchList, isLoading: isBranchListLoading } = useGetBranchListQuery();

   const [deleteTalon] = useLazyDeleteTalonQuery();

   const [clients_per_day, setClients_per_day] = useState(talons?.clients_per_day);

   useEffect(() => {
      setClients_per_day(talons?.clients_per_day);
   }, [talons]);

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [modalActive, setModalActive] = useState(false);
   const [searchValue, setSearchValue] = useState('');

   const tableContent = (talon) => (
      <div className={styles.tableContent}>
         <div onClick={() => handleDeletetalon(talon)}>{t('buttons.cancelIt')}</div>
      </div>
   );

   const columns = [
      {
         title: (
            <p className={styles.columnTitle} style={{ color: isDarkMode && '#92BFFF' }}>
               №
            </p>
         ),
         dataIndex: 'token',
         render: (value) => {
            if (value?.includes(searchValue)) {
               return (
                  <p className={styles.columnData} style={{ color: isDarkMode && 'white' }}>
                     {value}
                  </p>
               );
            } else {
               return null;
            }
         },
         filters: [...new Set(talons?.talons?.map((item) => item?.token[0]))]?.map((type) => ({
            text: type,
            value: type,
         })),
         onFilter: (value, record) => record?.token[0] === value,
      },
      {
         title: (
            <p className={styles.columnTitle} style={{ color: isDarkMode && '#92BFFF' }}>
               {t('table.titles.registered_at')}
            </p>
         ),
         dataIndex: 'registered_at',
         render: (value, talon) => (
            <div>
               <p
                  className={styles.columnData}
                  key={value?.token}
                  style={{ color: isDarkMode && 'white' }}
               >
                  {returnUnderstandableDate(value)}
               </p>
            </div>
         ),
      },
      {
         title: (
            <p className={styles.columnTitle} style={{ color: isDarkMode && '#92BFFF' }}>
               {t('table.titles.appointment_date')}
            </p>
         ),
         dataIndex: 'appointment_date',
         render: (value) => (
            <p className={styles.columnData} style={{ color: isDarkMode && 'white' }}>
               {returnUnderstandableDate(value)}
            </p>
         ),
      },
      {
         title: (
            <p className={styles.columnTitle} style={{ color: isDarkMode && '#92BFFF' }}>
               {t('table.titles.talons_type')}
            </p>
         ),
         dataIndex: 'client_type',
         render: (value) => (
            <p style={{ color: isDarkMode && 'white' }} className={styles.columnData}>
               {clientTypeTranslate(value)}
            </p>
         ),
         filters: [...new Set(talons?.talons?.map((item) => item?.client_type))]?.map((type) => ({
            text: clientTypeTranslate(type),
            value: type,
         })),
         onFilter: (value, record) => record.client_type === value,
      },
      {
         title: (
            <p className={styles.columnTitle} style={{ color: isDarkMode && '#92BFFF' }}>
               {t('table.titles.service')}
            </p>
         ),
         dataIndex: 'service',
         render: (value) => <p className={styles.columnData}>{getServiceName(value)}</p>,
         filters: serviceList?.length
            ? serviceList?.map((item) => ({
                 text: getServiceName(item?.name),
                 value: item?.name,
              }))
            : null,
         onFilter: (value, record) => record.service === value,
      },
      {
         title: (
            <p className={styles.columnTitle} style={{ color: isDarkMode && '#92BFFF' }}>
               {t('table.titles.status')}
            </p>
         ),
         dataIndex: 'status',
         render: (value) => {
            switch (value) {
               case 'in service':
                  return (
                     <p
                        className={styles.columnDataStatus}
                        style={{ color: isDarkMode ? '#B9FFFB' : '#2E79BD' }}
                     >
                        {t('table.body.status.inProgress')}
                     </p>
                  );
               case 'waiting':
                  return (
                     <p
                        className={styles.columnDataStatus}
                        style={{ color: isDarkMode ? '#88A5B5' : '#848484' }}
                     >
                        {t('table.body.status.expected')}
                     </p>
                  );
               case 'completed':
                  return (
                     <p
                        className={styles.columnDataStatus}
                        style={{ color: isDarkMode ? '#81E87F' : '#2E6C47' }}
                     >
                        {t('table.body.status.completed')}
                     </p>
                  );
               case 'canceled':
                  return (
                     <p
                        className={styles.columnDataStatus}
                        style={{ color: isDarkMode ? '#FFC8D0' : '#B5051E' }}
                     >
                        {t('table.body.status.cancelled')}
                     </p>
                  );
               default:
                  return (
                     <p
                        className={styles.columnDataStatus}
                        style={{ color: isDarkMode ? 'white' : 'darkgray' }}
                     >
                        {value}
                     </p>
                  );
            }
         },
         filters: [
            {
               text: t('status.inProgress'),
               value: 'in service',
            },
            {
               text: t('status.completed'),
               value: 'completed',
            },
            {
               text: t('status.cancelled'),
               value: 'canceled',
            },
            {
               text: t('status.expected'),
               value: 'waiting',
            },
         ],

         onFilter: (value, record) => record.status === value,
      },
      {
         title: (
            <p className={styles.columnTitle} style={{ color: isDarkMode && '#92BFFF' }}>
               {t('table.titles.serviceTime')}
            </p>
         ),
         dataIndex: 'id',
         render: (value, talon, index) => {
            return (
               <div className={styles.columnServiceBlock}>
                  {talon?.service_end ? (
                     <>
                        <p
                           className={styles.columnData}
                           style={{
                              color:
                                 calculateTimeDifference(talon?.service_start, talon?.service_end) >
                                    timeLimitSeconds && isDarkMode
                                    ? '#FFC8D0'
                                    : calculateTimeDifference(
                                         talon?.service_start,
                                         talon?.service_end
                                      ) > timeLimitSeconds && !isDarkMode
                                    ? '#B5051E'
                                    : calculateTimeDifference(
                                         talon?.service_start,
                                         talon?.service_end
                                      ) < timeLimitSeconds && isDarkMode
                                    ? '#81E87F'
                                    : '#2E6C47',
                           }}
                        >
                           {calculateTimeDifference(talon?.service_start, talon?.service_end)}{' '}
                           {t('table.body.serviceTime.min')}
                        </p>
                        {calculateTimeDifference(talon?.service_start, talon?.service_end) >
                           timeLimitSeconds && talon?.service_end ? (
                           <img
                              src={isDarkMode ? darkModeAlert : alert}
                              alt='alert'
                              className={styles.alert}
                           />
                        ) : null}
                     </>
                  ) : (
                     <>
                        <p
                           className={styles.columnDataStatus}
                           style={{ color: isDarkMode && 'white' }}
                        >
                           -
                        </p>
                        <div className={styles.childDiv}>
                           <Popover
                              content={tableContent(talon)}
                              trigger='hover'
                              placement='leftTop'
                              id='tablePopover'
                           >
                              <img
                                 src={isDarkMode ? darkModeDots : dots}
                                 alt='dots'
                                 style={{ cursor: 'pointer' }}
                              />
                           </Popover>
                        </div>
                     </>
                  )}
               </div>
            );
         },
         sorter: (a, b) =>
            calculateTimeDifference(a?.service_start, a?.service_end) -
            calculateTimeDifference(b?.service_start, b?.service_end),
      },
   ];

   const navigate = useNavigate();

   const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

   const handleDeletetalon = async (talon) => {
      try {
         await deleteTalon(talon.id);
         await refetch();
      } catch (error) {
         ShowMessage('error', error.message);
      }
   };

   const filteredTalons = talons?.talons?.filter((talon) => talon?.token.includes(searchValue));

   filteredTalons?.sort((a, b) => {
      const indexA = a.token.indexOf(searchValue);
      const indexB = b.token.indexOf(searchValue);

      if (indexA > -1 && indexB > -1) {
         return indexA - indexB;
      } else if (indexA > -1) {
         return -1;
      } else if (indexB > -1) {
         return 1;
      } else {
         return 0;
      }
   });

   useEffect(() => {
      if (!isAuthenticated()) {
         navigate('/');
      }
   }, []);

   return getTalonsLoading &&
      getProfileInfoLoading &&
      isBranchListLoading &&
      isServiceListLoading ? (
      // isServiceListLoading &&
      <div
         style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '20px',
         }}
      >
         <Spin indicator={antIcon} size='50' />
         <h4>{t('dataLoading')}</h4>
      </div>
   ) : (
      <MainLayout
         isSidebar={true}
         Navbar={<UserHeader searchValue={searchValue} setSearchValue={setSearchValue} />}
      >
         <div className={styles.main}>
            <div className={styles.mainCardBlock}>
               <div className={styles.cardBlock}>
                  <div
                     className={styles.card1}
                     style={{ backgroundColor: isDarkMode && '#374B67' }}
                  >
                     <div className={styles.head}>
                        <p style={{ color: isDarkMode && 'white' }}>{t('card.title1')}</p>
                     </div>
                     <div className={styles.body}>
                        <div style={{ backgroundColor: isDarkMode && '#136E37' }}>
                           <img
                              src={isDarkMode ? darkModeArrowGreen : arrowGreen}
                              style={{ backgroundColor: isDarkMode && '#136E37' }}
                              alt='arrow'
                           />
                           <span style={{ color: isDarkMode && '#A0FF9E' }}>
                              {clientsCounter(clients_per_day?.today, clients_per_day?.yesterday)}
                           </span>
                        </div>
                        <p style={{ color: isDarkMode && '#A0FF9E' }}>{t('card.body')}</p>
                     </div>
                     <div className={styles.footer}>
                        <p style={{ color: isDarkMode && 'white' }}>
                           {clients_per_day?.today?.completed}
                        </p>
                     </div>
                  </div>
                  <div
                     className={styles.card2}
                     style={{ backgroundColor: isDarkMode && '#374B67' }}
                  >
                     <div className={styles.head}>
                        <p style={{ color: isDarkMode && 'white' }}>{t('card.title2')}</p>
                     </div>
                     <div className={styles.body}>
                        <div style={{ backgroundColor: isDarkMode && '#712828' }}>
                           <img src={isDarkMode ? darkModeArrowRed : arrowRed} alt='arrow' />
                           <span style={{ color: isDarkMode && '#FFC8D0' }}>
                              {canceledClientsCounter(
                                 clients_per_day?.today,
                                 clients_per_day?.yesterday
                              )}
                           </span>
                        </div>
                        <p style={{ color: isDarkMode && '#FFC8D0' }}>{t('card.body')}</p>
                     </div>
                     <div className={styles.footer}>
                        <p style={{ color: isDarkMode && 'white' }}>
                           {clients_per_day?.today?.canceled}
                        </p>
                     </div>
                  </div>
               </div>
               <div className={styles.buttonBlock}>
                  <button className={styles.newTalon} onClick={() => setModalActive(true)}>
                     {t('newTalon.button1')}
                  </button>
                  <ModalForm
                     active={modalActive}
                     setActive={setModalActive}
                     branch={branchIndeficator(branchList, employee?.branch)}
                     serviceList={serviceList}
                     refetch={refetch}
                  />
               </div>
            </div>

            <Table
               style={{
                  marginBottom: '50px',
               }}
               loading={getTalonsLoading}
               className={isDarkMode ? 'dark_mode' : 'default_mode'}
               dataSource={filteredTalons?.map((item, index) => ({
                  ...item,
                  key: index,
               }))}
               columns={columns.filter((column) => column.title)}
               scroll={{ x: 1000 }}
               title={() => (
                  <p
                     style={{
                        fontFamily: "'Inter', sanf-serif",
                        color: isDarkMode ? 'white' : '#2B2B2B',

                        fontSize: '18px',
                        fontWeight: '600',
                     }}
                  >
                     {t('table.titles.allTalons')}
                  </p>
               )}
            />
         </div>
      </MainLayout>
   );
};

export default RegistrarHome;
