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

import deleteSvg from '@/assets/svg/delete.svg';
import alert from '@/assets/svg/1_6Alert.svg';
import { useTranslation } from 'react-i18next';
import MainLayout from '@/components/operator/UI/Layout';
import Navbar from '@/components/operator/UI/Navbar';
import { calculateTimeDifference, formatTime, returnUnderstandableDate } from '@/utils/utils';
import { useRegistrar } from '@/services/registrarStore';

const RegistrarHome = () => {
   const { t } = useTranslation();
   const [modalActive, setModalActive] = useState(false);

   const content = (
      <div className={styles.popoverContent}>
         <img src={edit} alt='edit' />
         <img src={deleteSvg} alt='delete' />
      </div>
   );

   const tableContent = (client) => (
      <div className={styles.tableContent}>
         <div onClick={() => handleTransferClient(client)}>Перенести</div>
         <div onClick={() => handleDeleteClient(client)}>Удалить</div>
      </div>
   );

   const columns = [
      {
         title: <p className={styles.columnTitle}>№</p>,
         dataIndex: 'id',
         render: (value) => <p className={styles.columnData}>{value}</p>,
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
               case 'Физ. лицо':
                  return <p className={styles.columnData}>{t('table.body.type.naturalPerson')}</p>;

                  break;
               case 'Юр. лицо':
                  return <p className={styles.columnData}>{t('table.body.type.legalЕntity')}</p>;

               default:
                  break;
            }
         },
      },
      {
         title: <p className={styles.columnTitle}>{t('table.titles.service')}</p>,
         dataIndex: 'service',

         render: (value) => {
            switch (value) {
               case 1:
                  return <p className={styles.columnData}>Кредитование</p>;
                  break;
               case 2:
                  return <p className={styles.columnData}>Обмен валют</p>;
                  break;
               case 3:
                  return <p className={styles.columnData}>Денежные переводы</p>;
                  break;
               case 4:
                  return <p className={styles.columnData}>Выпуск карты</p>;
                  break;
               case 5:
                  return <p className={styles.columnData}>Получить перевод</p>;
                  break;
               case 6:
                  return <p className={styles.columnData}>Открыть счет</p>;
                  break;
               case 7:
                  return <p className={styles.columnData}>Операции с ценными бумагами</p>;
                  break;
               case 8:
                  return <p className={styles.columnData}>Исламское финансирование</p>;
                  break;

               default:
                  break;
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

               default:
                  break;
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
                           {calculateTimeDifference(talon?.service_start, talon?.service_end)} мин
                        </p>
                        {calculateTimeDifference(talon?.service_start, talon?.service_end) > 3 &&
                        talon?.service_end ? (
                           <img src={alert} alt='alert' className={styles.alert} />
                        ) : (
                           ''
                        )}
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

   useEffect(() => {
      getTalons();
   }, []);
   const antIcon = <LoadingOutlined style={{ fontSize: 54 }} spin />;

   return getTalonsLoading ? (
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
      <MainLayout isSidebar={false} Navbar={<UserHeader />}>
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
               loading={getTalonsLoading}
               dataSource={talons}
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
                     {t('table.titles.allClients')}
                  </p>
               )}
            />
         </div>
      </MainLayout>
   );
};

export default RegistrarHome;
