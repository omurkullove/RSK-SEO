import React from 'react';
import styles from '@/assets/styles/1.6/Home.module.scss';
import { Popover, Row, Table } from 'antd';
import dots from '@/assets/svg/dots.svg';
import arrowGreen from '@/assets/svg/arrowGreen.svg';
import arrowRed from '@/assets/svg/arrowRed.svg';
import MainLayout from '@/components/1.6/UI/Layout';
import alert from '@/assets/svg/1_6Alert.svg';
import edit from '@/assets/svg/edit.svg';
import deleteSvg from '@/assets/svg/delete.svg';

const HomePage = () => {
   const handleDeleteClient = async (client) => {
      try {
         console.log(client);
      } catch (error) {
         console.log(error);
      }
   };

   const handleTransferClient = async (client) => {
      try {
         console.log(client);
      } catch (error) {
         console.log(error);
      }
   };

   const content = (
      <div className={styles.popoverContent}>
         <img src={edit} alt='edit' />
         <img src={deleteSvg} alt='delet' />
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
         dataIndex: 'number',
         render: (value) => <p className={styles.columnData}>{value}</p>,
      },
      {
         title: <p className={styles.columnTitle}>Имя</p>,
         dataIndex: 'name',
         render: (value) => <p className={styles.columnDataName}>{value}</p>,
      },
      {
         title: <p className={styles.columnTitle}>В очереди</p>,
         dataIndex: 'inOrder',
         render: (value) => <p className={styles.columnData}>{value}</p>,
      },
      {
         title: <p className={styles.columnTitle}>Льгота</p>,
         dataIndex: 'benefit',
         render: (value) => <p className={styles.columnData}>{value}</p>,
      },
      {
         title: <p className={styles.columnTitle}>Услуга</p>,
         dataIndex: 'service',
         render: (value) => <p className={styles.columnData}>{value}</p>,
      },

      {
         title: <p className={styles.columnTitle}>Статус</p>,
         dataIndex: 'status',
         render: (value) => {
            switch (value) {
               case 'progress':
                  return (
                     <p
                        className={styles.columnDataStatus}
                        style={{ color: '#2E79BD' }}
                     >
                        В процессе
                     </p>
                  );
                  break;
               case 'await':
                  return (
                     <p
                        className={styles.columnDataStatus}
                        style={{ color: '#848484' }}
                     >
                        Ожидается
                     </p>
                  );

                  break;
               case 'done':
                  return (
                     <p
                        className={styles.columnDataStatus}
                        style={{ color: '#2E6C47' }}
                     >
                        Завершен
                     </p>
                  );

                  break;

               default:
                  break;
            }
         },
      },
      {
         title: <p className={styles.columnTitle}>Время обслуживания</p>,
         dataIndex: 'time',
         render: (value, client) => {
            if (+value <= 15 && value) {
               return (
                  <p
                     className={styles.columnDataTime}
                     style={{ color: '#2E6C47' }}
                  >
                     {value} мин
                  </p>
               );
            } else if (+value > 15) {
               return (
                  <div
                     style={{
                        color: '#B5051E',
                     }}
                     className={styles.columnDataTime}
                  >
                     <span>{value} мин</span>
                     <img src={alert} alt='alert' />
                     <Popover
                        content={tableContent(client)}
                        trigger='click'
                        placement='leftTop'
                        id='tablePopover'
                     >
                        <img
                           src={dots}
                           alt='dots'
                           style={{ cursor: 'pointer' }}
                        />
                     </Popover>
                  </div>
               );
            } else {
               return <p className={styles.columnDataTime}>-</p>;
            }
         },
      },
   ];
   const data = [
      {
         number: 'A0122',
         name: 'Ильясов Айбек Рустамович',
         inOrder: '-',
         benefit: 'нет',
         service: 'Услуга 1',
         status: 'done',
         time: '15',
         key: 1,
      },
      {
         number: 'A0912',
         name: 'Иванов Федор Петрович',
         inOrder: '-',
         benefit: 'нет',
         service: 'Услуга 4',
         status: 'progress',
         key: 2,
         time: '18',
      },
      {
         number: 'A0912',
         name: 'Иванов Федор Петрович',
         inOrder: '-',
         benefit: 'нет',
         service: 'Услуга 4',
         status: 'await',
         key: 3,
         time: '15',
      },
      {
         number: 'A0912',
         name: 'Иванов Федор Петрович',
         inOrder: '-',
         benefit: 'нет',
         service: 'Услуга 4',
         status: 'В процессе',
         key: 4,
         time: '18',
      },
      {
         number: 'A0912',
         name: 'Иванов Федор Петрович',
         inOrder: '-',
         benefit: 'нет',
         service: 'Услуга 4',
         status: 'В процессе',
         key: 5,
         time: '',
      },
      {
         number: 'A0912',
         name: 'Иванов Федор Петрович',
         inOrder: '-',
         benefit: 'нет',
         service: 'Услуга 4',
         status: 'В процессе',
         key: 6,
         time: '',
      },
      {
         number: 'A0912',
         name: 'Иванов Федор Петрович',
         inOrder: '-',
         benefit: 'нет',
         service: 'Услуга 4',
         status: 'В процессе',
         key: 7,
         time: '15',
      },
   ];

   return (
      <MainLayout>
         <div className={styles.main}>
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
                     <p>Клиентов за день</p>
                  </div>
                  <div className={styles.body}>
                     <div>
                        <img src={arrowGreen} alt='arrow' />
                        <span>3</span>
                     </div>
                     <p>Больше чем вчера</p>
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
                     <p>Отмененные визиты</p>
                  </div>
                  <div className={styles.body}>
                     <div>
                        <img src={arrowRed} alt='arrow' />
                        <span>1</span>
                     </div>
                     <p>Больше чем вчера</p>
                  </div>
                  <div className={styles.footer}>
                     <p>4</p>
                  </div>
               </div>
            </div>

            <Table
               dataSource={data}
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
                     Все клиенты:
                  </p>
               )}
            />
         </div>
      </MainLayout>
   );
};

export default HomePage;
