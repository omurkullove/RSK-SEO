import React, { useEffect } from 'react';

import { UserHeader } from '@/components/registrar/Navbar/Navbar-1-7';
import styles from '@/assets/styles/registrar/Main.module.scss';
import { ModalForm } from '@/components/registrar/ModalWindow/ModalForm';
import { Popover, Spin, Table } from 'antd';
import { useState } from 'react';
import arrowGreen from '@/assets/svg/arrowGreen.svg';

import arrowRed from '@/assets/svg/arrowRed.svg';
import edit from '@/assets/svg/edit.svg';
import dots from '@/assets/svg/dots.svg';
import { LoadingOutlined } from '@ant-design/icons';
import { returnUnderstandableDate } from '@/utils/utils';
import deleteSvg from '@/assets/svg/delete.svg';
import alert from '@/assets/svg/1_6Alert.svg';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/operator/UI/Layout';
import { calculateTimeDifference } from '@/utils/utils';
import { useRegistrar } from '@/services/registrarStore';
import { useNavigate } from 'react-router';
import { useOperator } from '@/services/operatorStore';
import { useMain } from '@/services/MainStore';

const RegistrarHome = () => {
   const [searchValue, setSearchValue] = useState('1');
   const { t } = useTranslation();
   const [modalActive, setModalActive] = useState(false);

   const employee = useMain((state) => state.employee);
   const getProfileInfo = useMain((state) => state.getProfileInfo);
   const getProfileInfoLoading = useMain((state) => state.getProfileInfoLoading);

   console.log(searchValue, 'Input');

   console.log(employee);

   const tableContent = (talon) => (
      <div className={styles.tableContent}>
         <div onClick={() => handleTransferClient(talon)}>Изменить</div>
         <div onClick={() => handleDeletetalon(talon)}>Удалить</div>
      </div>
   );

   const columns = [
      {
         title: <p className={styles.columnTitle}>№</p>,
         dataIndex: 'token',
         render: (value) => {
            if (value.includes(searchValue)) {
               return <p className={styles.columnData}>{value}</p>;
            } else {
               return null;
            }
         },
      },
      {
         title: <p className={styles.columnTitle}>Дата регистрации</p>,
         dataIndex: 'registered_at',
         render: (value, talon) => (
            <div>
               <p className={styles.columnData} key={value?.token}>
                  {returnUnderstandableDate(value)}
               </p>
            </div>
         ),
      },
      {
         title: <p className={styles.columnTitle}>Дата назначения</p>,
         dataIndex: 'appointment_date',
         render: (value) => <p className={styles.columnData}>{returnUnderstandableDate(value)}</p>,
      },
      {
         title: <p className={styles.columnTitle}>Дата изменения</p>,
         dataIndex: 'updated_at',
         render: (value) => <p className={styles.columnData}>{returnUnderstandableDate(value)}</p>,
      },
      {
         title: <p className={styles.columnTitle}>{t('table.titles.talons_type')}</p>,
         dataIndex: 'client_type',
         render: (value) => {
            switch (value) {
               case 'Физ.лицо':
                  return <p className={styles.columnData}>{t('table.body.type.naturalPerson')}</p>;
               case 'Юр.лицо':
                  return <p className={styles.columnData}>{t('table.body.type.legalЕntity')}</p>;
               default:
                  return <p className={styles.columnData}>{value}</p>;
            }
         },
      },
      {
         title: <p className={styles.columnTitle}>{t('table.titles.service')}</p>,
         dataIndex: 'service',
         render: (value) => {
            switch (value) {
               case 1:
                  return (
                     <p className={styles.columnData}>{t('table.body.service.CreditFinancing')}</p>
                  );
               case 2:
                  return (
                     <p className={styles.columnData}>{t('table.body.service.CurrencyExchange')}</p>
                  );
               case 3:
                  return (
                     <p className={styles.columnData}>{t('table.body.service.MoneyTransfers')}</p>
                  );
               case 4:
                  return (
                     <p className={styles.columnData}>{t('table.body.service.CardIssuance')}</p>
                  );
               case 5:
                  return (
                     <p className={styles.columnData}>{t('table.body.service.ReceiveTransfer')}</p>
                  );
               case 6:
                  return (
                     <p className={styles.columnData}>{t('table.body.service.OpenAnAccount')}</p>
                  );
               case 7:
                  return (
                     <p className={styles.columnData}>
                        {t('table.body.service.SecuritiesOperations')}
                     </p>
                  );
               case 8:
                  return (
                     <p className={styles.columnData}>{t('table.body.service.IslamicFinancing')}</p>
                  );
               default:
                  return null;
            }
         },
      },
      {
         title: <p className={styles.columnTitle}>Очередь</p>,
         dataIndex: 'queue',
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
               case 'canceled':
                  return (
                     <p className={styles.columnDataStatus} style={{ color: '#B5051E' }}>
                        {t('table.body.status.cancelled')}
                     </p>
                  );
               default:
                  return null;
            }
         },
      },
      {
         title: <p className={styles.columnTitle}>{t('table.titles.serviceTime')}</p>,
         dataIndex: 'id',
         render: (value, talon, index) => {
            return (
               <div className={styles.columnServiceBlock}>
                  {talon?.status === 'complited' ? (
                     <>
                        <p
                           className={styles.columnData}
                           style={{
                              color:
                                 calculateTimeDifference(talon?.service_start, talon?.service_end) >
                                 3
                                    ? '#B5051E'
                                    : '#2E6C47',
                           }}
                        >
                           {calculateTimeDifference(talon?.service_start, talon?.service_end)}{' '}
                           {t('table.body.serviceTime.min')}
                        </p>
                        {calculateTimeDifference(talon?.service_start, talon?.service_end) > 3 &&
                        talon?.service_end ? (
                           <img src={alert} alt='alert' className={styles.alert} />
                        ) : null}
                     </>
                  ) : (
                     <>
                        <p className={styles.columnDataStatus}>-</p>
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
                     </>
                  )}
               </div>
            );
         },
      },
   ];

   const getTalons = useRegistrar((state) => state.getTalons);
   const talons = useRegistrar((state) => state.talons);
   const getTalonsLoading = useRegistrar((state) => state.getTalonsLoading);

   const navigate = useNavigate();

   useEffect(() => {
      getTalons();
      getProfileInfo(JSON.parse(localStorage.getItem('email')));

      if (!JSON.parse(localStorage.getItem('token'))) {
         navigate('/');
      }
   }, []);
   const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

   const deleteTalon = useRegistrar((state) => state.deleteTalon);

   const handleDeletetalon = async (talon) => {
      try {
         await deleteTalon(talon.token);
         await getTalons();
      } catch (error) {
         console.log(error);
      }
   };

   const filteredTalons = talons.filter((talon) => talon.token.includes(searchValue));

   filteredTalons.sort((a, b) => {
      // Compare the position of the searchValue in the token
      const indexA = a.token.indexOf(searchValue);
      const indexB = b.token.indexOf(searchValue);

      if (indexA > -1 && indexB > -1) {
         // Both talons have the searchValue in the token
         return indexA - indexB;
      } else if (indexA > -1) {
         // Only talon A has the searchValue in the token
         return -1;
      } else if (indexB > -1) {
         // Only talon B has the searchValue in the token
         return 1;
      } else {
         // None of the talons have the searchValue in the token
         return 0;
      }
   });

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
      <MainLayout
         isSidebar={false}
         Navbar={
            <UserHeader
               employee={employee}
               searchValue={searchValue}
               setSearchValue={setSearchValue}
            />
         }
      >
         <div className={styles.main}>
            <div className={styles.mainCardBlock}>
               <div className={styles.cardBlock}>
                  <div className={styles.card1}>
                     <div className={styles.head}>
                        <p>{t('card.title1')}</p>
                     </div>
                     <div className={styles.body}>
                        <div>
                           <img src={arrowGreen} alt='arrow' />
                           <span>3</span>
                        </div>
                        <p>{t('card.body')}</p>
                     </div>
                     <div className={styles.footer}>
                        <p>16</p>
                     </div>
                  </div>
                  <div className={styles.card2}>
                     <div className={styles.head}>
                        <p>{t('card.title2')}</p>
                     </div>
                     <div className={styles.body}>
                        <div>
                           <img src={arrowRed} alt='arrow' />
                           <span>1</span>
                        </div>
                        <p>{t('card.body')}</p>
                     </div>
                     <div className={styles.footer}>
                        <p>4</p>
                     </div>
                  </div>
               </div>
               <div className={styles.buttonBlock}>
                  <button className={styles.newTalon} onClick={() => setModalActive(true)}>
                     Новый талон
                  </button>
                  <ModalForm active={modalActive} setActive={setModalActive} />
               </div>
            </div>

            <Table
               style={{
                  marginBottom: '50px',
               }}
               loading={getTalonsLoading}
               dataSource={filteredTalons}
               columns={columns.filter((column) => column.title)}
               scroll={{ x: 1000 }}
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

export default RegistrarHome;
