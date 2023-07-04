import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

// Components & modules
import MainLayout from '@/components/operator/UI/Layout';
import Navbar from '@/components/operator/UI/Navbar';
import { useOperator } from '@/services/operatorStore';

// Utils
import {
   ShowMessage,
   canceledClientsCounter,
   clientsCounter,
   formatTime,
   returnUnderstandableDate,
   timeLimitSeconds,
} from '@/utils/utils';

// UI
import { Popover, Table, Spin, Statistic } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from '@/assets/styles/operator/Home.module.scss';
import dots from '@/assets/svg/dots.svg';
import darkModeDots from '@/assets/svg/darkModeDots.svg';
import arrowGreen from '@/assets/svg/arrowGreen.svg';
import darkModeArrowGreen from '@/assets/svg/darkModeArrowGreen.svg';
import darkModeArrowRed from '@/assets/svg/darkModeArrowRed.svg';

import arrowRed from '@/assets/svg/arrowRed.svg';
import alert from '@/assets/svg/1_6Alert.svg';
import darkModeAlert from '@/assets/svg/darkModeAlert.svg';

import edit from '@/assets/svg/edit.svg';
import deleteSvg from '@/assets/svg/delete.svg';

const HomePage = () => {
   // Store states & functions
   const getProfileInfo = useOperator((state) => state.getProfileInfo);
   const transferTalonToEnd = useOperator((state) => state.transferTalonToEnd);
   const transferTalonToStart = useOperator((state) => state.transferTalonToStart);
   const serviceEnd = useOperator((state) => state.serviceEnd);
   const serviceStart = useOperator((state) => state.serviceStart);
   const getTalons = useOperator((state) => state.getTalons);
   const deleteTalon = useOperator((state) => state.deleteTalon);
   const talons = useOperator((state) => state.talons);
   const employee = useOperator((state) => state.employee);
   const getTalonsLoading = useOperator((state) => state.getTalonsLoading);
   const getProfileInfoLoading = useOperator((state) => state.getProfileInfoLoading);
   const currentTalon = useOperator((state) => state.currentTalon);
   const clients_per_day = useOperator((state) => state.clients_per_day);
   const isDarkMode = useOperator((state) => state.isDarkMode);
   const errors = useOperator((state) => state.errors);

   // Vanilla states
   const [isRunning, setIsRunning] = useState(false);
   const [seconds, setSeconds] = useState(0);
   const [isStart, setIsStart] = useState(false);

   const tableRef = useRef(null);

   const navigate = useNavigate();

   // Locale
   const { t } = useTranslation();

   // Table columns
   const columns = [
      {
         title: (
            <p className={styles.columnTitle} style={{ color: isDarkMode && '#92BFFF' }} key={1}>
               №
            </p>
         ),
         dataIndex: 'token',
         render: (value, talon) => (
            <div>
               <p
                  className={styles.columnData}
                  key={value.token}
                  style={{ color: isDarkMode && 'white' }}
               >
                  {value}
               </p>
            </div>
         ),
      },
      {
         title: (
            <p className={styles.columnTitle} style={{ color: isDarkMode && '#92BFFF' }}>
               {t('table.titles.registered_at')}
            </p>
         ),
         dataIndex: 'registered_at',
         render: (value) => (
            <p
               className={styles.columnData}
               key={value.token}
               style={{ color: isDarkMode && 'white' }}
            >
               {returnUnderstandableDate(value)}
            </p>
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
         render: (value) => {
            switch (value) {
               case 'Физ. лицо':
                  return (
                     <p className={styles.columnData} style={{ color: isDarkMode && 'white' }}>
                        {t('table.body.type.naturalPerson')}
                     </p>
                  );

               case 'Юр. лицо':
                  return (
                     <p className={styles.columnData} style={{ color: isDarkMode && 'white' }}>
                        {t('table.body.type.legalЕntity')}
                     </p>
                  );

               default:
                  return (
                     <p className={styles.columnData} style={{ color: isDarkMode && 'white' }}>
                        {value}
                     </p>
                  );
            }
         },
      },
      {
         title: (
            <p className={styles.columnTitle} style={{ color: isDarkMode && '#92BFFF' }}>
               {t('table.titles.service')}
            </p>
         ),
         dataIndex: 'service',

         render: (value) => (
            <p className={styles.columnData} style={{ color: isDarkMode && 'white' }}>
               {value}
            </p>
         ),
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

               case 'complited':
                  return (
                     <p
                        className={styles.columnDataStatus}
                        style={{ color: isDarkMode ? '#81E87F' : '##2E6C47' }}
                     >
                        {t('table.body.status.completed')}
                     </p>
                  );

               default:
                  break;
            }
         },
      },
      {
         title: (
            <p className={styles.columnTitle} style={{ color: isDarkMode && '#92BFFF' }}>
               {t('table.titles.serviceTime')}
            </p>
         ),
         dataIndex: 'service_start',
         render: (value, talon, index) => {
            return (
               <div className={styles.columnServiceBlock}>
                  {seconds && index === 0 ? (
                     <Statistic
                        valueStyle={{
                           color:
                              isDarkMode && seconds > timeLimitSeconds
                                 ? '#FFC8D0'
                                 : !isDarkMode && seconds > timeLimitSeconds
                                 ? '#B5051E'
                                 : isDarkMode && seconds < timeLimitSeconds
                                 ? '#81E87F'
                                 : !isDarkMode && seconds < timeLimitSeconds
                                 ? '#2E6C47'
                                 : isDarkMode
                                 ? '#FFC8D0'
                                 : '#B5051E',
                           fontSize: '18px',
                           fontFamily: '$Inter',
                        }}
                        value={seconds}
                        suffix={t('table.body.serviceTime.min')}
                        formatter={(value) => formatTime(value)}
                     />
                  ) : (
                     <p
                        className={styles.columnDataStatus}
                        style={{ color: isDarkMode && 'white' }}
                     >
                        -
                     </p>
                  )}

                  {seconds > timeLimitSeconds && index === 0 ? (
                     <img
                        src={isDarkMode ? darkModeAlert : alert}
                        alt='alert'
                        className={styles.alert}
                     />
                  ) : null}

                  {seconds && index === 0 ? null : (
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
                  )}
               </div>
            );
         },
      },
   ];

   // Loading Icon
   const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

   // Handlers
   const handleDeletetalon = async (talon) => {
      try {
         await deleteTalon(talon.token);
         console.log(talon);
         await getTalons();
      } catch (error) {
         console.log(error);
      }
   };

   const handleTransferToEnd = async (talon) => {
      await transferTalonToEnd(talon.token);
      await getTalons();
   };

   const handleTransferToStart = async (talon) => {
      await transferTalonToStart(talon.token);
      await getTalons();
   };

   // Service operation
   const handleStart = async (token) => {
      await serviceStart(token);
      await getTalons();
      startStopwatch();
      setIsStart(true);
   };

   const handleEnd = async (token) => {
      await serviceEnd(token);
      await getTalons();
      stopStopwatch();
      setIsStart(false);
   };

   // Popover
   const tableContent = (talon) => (
      <div className={styles.tableContent}>
         <div onClick={() => handleTransferToStart(talon)}>{t('table.body.popover.toStart')}</div>
         <div onClick={() => handleTransferToEnd(talon)}>{t('table.body.popover.toEnd')}</div>
         <div onClick={() => handleDeletetalon(talon)}>{t('table.body.popover.delete')}</div>
      </div>
   );

   // Timer
   const startStopwatch = () => {
      ShowMessage('loading', 'Началось время обслуживания', 8);

      setIsRunning(true);
   };

   const stopStopwatch = () => {
      ShowMessage('success', 'Обслуживание  завершилось');

      setIsRunning(false);
      setSeconds(0);
   };

   // Effects
   // Fetch data
   useEffect(() => {
      getTalons();
      getProfileInfo(JSON.parse(localStorage.getItem('email')));

      if (!JSON.parse(localStorage.getItem('token'))) {
         navigate('/');
      }
   }, []);

   // Message indicator
   useEffect(() => {
      if (employee && JSON.parse(localStorage.getItem('token'))) {
         ShowMessage('success', 'Вы успешно зашли на аккаунт');
      }
   }, []);

   // Timer indicator
   useEffect(() => {
      let interval = null;

      if (isRunning) {
         interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
         }, 1000);
      } else {
         clearInterval(interval);
      }

      return () => clearInterval(interval);
   }, [isRunning]);

   return getTalonsLoading && getProfileInfoLoading ? (
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
         <h4>Идет подсчет данных....</h4>
      </div>
   ) : (
      <MainLayout isSidebar={true} Navbar={<Navbar employee={employee} />}>
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

               <div className={styles.currentTalonBlock}>
                  <p style={{ color: isDarkMode && '#DFDFDF' }}>{t('now')}</p>
                  <ul>
                     <li style={{ color: isDarkMode && '#FFF' }}>{currentTalon?.token}</li>
                     <li style={{ color: isDarkMode && '#FFF' }}>
                        {returnUnderstandableDate(currentTalon?.registered_at)}
                     </li>
                     <li style={{ color: isDarkMode && '#FFF' }}>
                        {returnUnderstandableDate(currentTalon?.appointment_date)}
                     </li>
                     <li style={{ color: isDarkMode && '#FFF' }}>{currentTalon?.client_type}</li>
                     <li style={{ color: isDarkMode && '#FFF' }}>{currentTalon?.service}</li>
                  </ul>
                  <div>
                     <button
                        onClick={() => handleStart(currentTalon?.token)}
                        style={{
                           backgroundColor:
                              isStart && isDarkMode
                                 ? '#03466B'
                                 : isStart && !isDarkMode
                                 ? '#A5A5A5'
                                 : '#136E37',
                           color: isStart && 'rgb(197, 197, 197)',
                        }}
                        disabled={isStart}
                     >
                        {t('button.start')}
                     </button>
                     <button
                        disabled={!isStart}
                        onClick={() => handleEnd(currentTalon?.token)}
                        style={{
                           backgroundColor:
                              !isStart && isDarkMode
                                 ? '#03466B'
                                 : !isStart && !isDarkMode
                                 ? '#A5A5A5'
                                 : '#136E37',
                           color: !isStart && 'rgb(197, 197, 197)',
                        }}
                     >
                        {t('button.end')}
                     </button>
                  </div>
               </div>
            </div>

            <Table
               ref={tableRef}
               style={{
                  marginBottom: '50px',
               }}
               className={isDarkMode ? 'dark_mode' : 'default_mode'}
               loading={getTalonsLoading}
               dataSource={talons.map((item, index) => ({
                  ...item,
                  key: index,
               }))}
               columns={columns}
               scroll={{ x: 1300 }}
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

export default HomePage;
