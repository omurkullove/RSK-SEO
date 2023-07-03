import React, { useEffect, useState } from 'react';
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
import arrowGreen from '@/assets/svg/arrowGreen.svg';
import arrowRed from '@/assets/svg/arrowRed.svg';
import alert from '@/assets/svg/1_6Alert.svg';
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

   // Vanilla states
   const [isRunning, setIsRunning] = useState(false);
   const [seconds, setSeconds] = useState(0);
   const [isStart, setIsStart] = useState(false);

   const navigate = useNavigate();

   // Locale
   const { t } = useTranslation();

   // Table columns
   const columns = [
      {
         title: (
            <p className={styles.columnTitle} key={1}>
               №
            </p>
         ),
         dataIndex: 'token',
         render: (value, talon) => (
            <div>
               <p className={styles.columnData} key={value.token}>
                  {value}
               </p>
            </div>
         ),
      },
      {
         title: <p className={styles.columnTitle}>{t('table.titles.registered_at')}</p>,
         dataIndex: 'registered_at',
         render: (value) => (
            <p className={styles.columnData} key={value.token}>
               {returnUnderstandableDate(value)}
            </p>
         ),
      },

      {
         title: <p className={styles.columnTitle}>{t('table.titles.appointment_date')}</p>,
         dataIndex: 'appointment_date',
         render: (value) => <p className={styles.columnData}>{returnUnderstandableDate(value)}</p>,
      },
      {
         title: <p className={styles.columnTitle}>{t('table.titles.talons_type')}</p>,
         dataIndex: 'client_type',
         render: (value) => {
            switch (value) {
               case 'Физ. лицо':
                  return <p className={styles.columnData}>{t('table.body.type.naturalPerson')}</p>;

                  break;
               case 'Юр. лицо':
                  return <p className={styles.columnData}>{t('table.body.type.legalЕntity')}</p>;

               default:
                  return <p className={styles.columnData}>{value}</p>;
                  break;
            }
         },
      },
      {
         title: <p className={styles.columnTitle}>{t('table.titles.service')}</p>,
         dataIndex: 'service',

         render: (value) => <p className={styles.columnData}>{value}</p>,
      },

      {
         title: <p className={styles.columnTitle}>{t('table.titles.status')}</p>,
         dataIndex: 'status',
         render: (value) => {
            switch (value) {
               case 'in service':
                  return (
                     <p className={styles.columnDataStatus} style={{ color: '#2E79BD' }}>
                        {t('table.body.status.inProgress')}
                     </p>
                  );
               case 'waiting':
                  return (
                     <p className={styles.columnDataStatus} style={{ color: '#848484' }}>
                        {t('table.body.status.expected')}
                     </p>
                  );

               case 'complited':
                  return (
                     <p className={styles.columnDataStatus} style={{ color: '#2E6C47' }}>
                        {t('table.body.status.completed')}
                     </p>
                  );

               default:
                  break;
            }
         },
      },
      {
         title: <p className={styles.columnTitle}>{t('table.titles.serviceTime')}</p>,
         dataIndex: 'service_start',
         render: (value, talon, index) => {
            return (
               <div className={styles.columnServiceBlock}>
                  {seconds && index === 0 ? (
                     <Statistic
                        valueStyle={{
                           color: seconds > timeLimitSeconds ? '#B5051E' : '#2E6C47',
                           fontSize: '18px',
                           fontFamily: '$Inter',
                        }}
                        style={{ color: '#2E6C47' }}
                        value={seconds}
                        suffix={t('table.body.serviceTime.min')}
                        formatter={(value) => formatTime(value)}
                     />
                  ) : (
                     <p className={styles.columnDataStatus}>-</p>
                  )}

                  {seconds > timeLimitSeconds && index === 0 ? (
                     <img src={alert} alt='alert' className={styles.alert} />
                  ) : null}

                  {seconds && index === 0 ? null : (
                     <div className={styles.childDiv}>
                        <Popover
                           content={tableContent(talon)}
                           trigger='hover'
                           placement='leftTop'
                           id='tablePopover'
                        >
                           <img src={dots} alt='dots' style={{ cursor: 'pointer' }} />
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

   // Popover's
   const content = (
      <div className={styles.popoverContent}>
         <img src={edit} alt='edit' />
         <img src={deleteSvg} alt='delet' />
      </div>
   );

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
                  <div className={styles.card1}>
                     <div className={styles.head}>
                        <div>
                           <Popover
                              id='cardPopover'
                              content={content}
                              trigger='click'
                              placement='rightTop'
                           >
                              <img src={dots} alt='dots' />
                           </Popover>
                        </div>
                        <p>{t('card.title1')}</p>
                     </div>
                     <div className={styles.body}>
                        <div>
                           <img src={arrowGreen} alt='arrow' />
                           <span>
                              {clientsCounter(clients_per_day?.today, clients_per_day?.yesterday)}
                           </span>
                        </div>
                        <p>{t('card.body')}</p>
                     </div>
                     <div className={styles.footer}>
                        <p>{clients_per_day?.today?.completed}</p>
                     </div>
                  </div>
                  <div className={styles.card2}>
                     <div className={styles.head}>
                        <div>
                           <Popover
                              id='cardPopover'
                              content={content}
                              trigger='click'
                              placement='rightTop'
                           >
                              <img src={dots} alt='dots' />
                           </Popover>
                        </div>
                        <p>{t('card.title2')}</p>
                     </div>
                     <div className={styles.body}>
                        <div>
                           <img src={arrowRed} alt='arrow' />
                           <span>
                              {canceledClientsCounter(
                                 clients_per_day?.today,
                                 clients_per_day?.yesterday
                              )}
                           </span>
                        </div>
                        <p>{t('card.body')}</p>
                     </div>
                     <div className={styles.footer}>
                        <p>{clients_per_day?.today?.canceled}</p>
                     </div>
                  </div>
               </div>

               <div className={styles.currentTalonBlock}>
                  <p>{t('now')}</p>
                  <ul>
                     <li>{currentTalon?.token}</li>
                     <li>{returnUnderstandableDate(currentTalon?.registered_at)}</li>
                     <li>{returnUnderstandableDate(currentTalon?.appointment_date)}</li>
                     <li>{currentTalon?.client_type}</li>
                     <li>{currentTalon?.service}</li>
                  </ul>
                  <div>
                     <button
                        onClick={() => handleStart(currentTalon?.token)}
                        style={{ backgroundColor: isStart ? '#A5A5A5' : ' #136E37' }}
                        disabled={isStart}
                     >
                        {t('button.start')}
                     </button>
                     <button
                        disabled={!isStart}
                        onClick={() => handleEnd(currentTalon?.token)}
                        style={{ backgroundColor: isStart ? '#136E37' : '#A5A5A5' }}
                     >
                        {t('button.end')}
                     </button>
                  </div>
               </div>
            </div>

            <Table
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
                        color: '#2B2B2B',
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
