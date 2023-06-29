import React from "react";
import { UserHeader } from "@/components/1.7/Navbar/Navbar-1-7";
import styles from "@/assets/styles/1.7/Main.module.scss";
import { ModalForm } from "@/components/1.7/ModalWindow/ModalForm";
import {  Space, Table, Tag } from 'antd';
import { useState } from "react";
import arrowGreen from "@/assets/svg/arrowGreen.svg";
import arrowRed from "@/assets/svg/arrowRed.svg";

const Root1_7 = () => {
  const [modalActive, setModalActive] = useState(false);


  const columns = [
   {
     title: 'Name',
     dataIndex: 'name',
     key: 'name',
     render: (text) => <a>{text}</a>,
   },
   {
     title: 'Age',
     dataIndex: 'age',
     key: 'age',
   },
   {
     title: 'Address',
     dataIndex: 'address',
     key: 'address',
   },
   {
     title: 'Tags',
     key: 'tags',
     dataIndex: 'tags',
     render: (_, { tags }) => (
       <>
         {tags.map((tag) => {
           let color = tag.length > 5 ? 'geekblue' : 'green';
           if (tag === 'loser') {
             color = 'volcano';
           }
           return (
             <Tag color={color} key={tag}>
               {tag.toUpperCase()}
             </Tag>
           );
         })}
       </>
     ),
   },
   {
     title: 'Action',
     key: 'action',
     render: (_, record) => (
       <Space size="middle">
         <a>Invite {record.name}</a>
         <a>Delete</a>
       </Space>
     ),
   },
 ];
 const data = [
   {
     key: '1',
     name: 'John Brown',
     age: 32,
     address: 'New York No. 1 Lake Park',
     tags: ['nice', 'developer'],
   },
   {
     key: '2',
     name: 'Jim Green',
     age: 42,
     address: 'London No. 1 Lake Park',
     tags: ['loser'],
   },
   {
     key: '3',
     name: 'Joe Black',
     age: 32,
     address: 'Sydney No. 1 Lake Park',
     tags: ['cool', 'teacher'],
   },
 ];

  
  return (
    <div>
      <UserHeader />

      <div className={styles.main}>
        <div className={styles.cards}>
          <div className={styles.main__firstCard}>
            <p>Клиентов за день</p>
            <div>
              <div className={styles.body}>
                <div className={styles.greenlogo}>
                  <img src={arrowGreen} alt="logo" />
                  <span>3</span>
                </div>
                <p>Больше чем вчера</p>
              </div>
              <p className={styles.number}>16</p>
            </div>
          </div>
          <div className={styles.main__secondCard}>
            <p>Отмененные визиты</p>
            <div>
              <div className={styles.secondBody}>
                <div className={styles.redlogo}>
                  <img src={arrowRed} alt="logo" />
                  <span>1</span>
                </div>
                <p>Больше чем вчера</p>
              </div>
              <p className={styles.number}>4</p>
            </div>
          </div>
        </div>

        <div className={styles.ModalWindow}>
          <button
            className={styles.newTalon}
            onClick={() => setModalActive(true)}>
            Новый талон
          </button>
          <ModalForm active={modalActive} setActive={setModalActive} />
        </div>
     
      </div>
      <div className={styles.table}>
      <Table columns={columns} dataSource={data} />
            </div>
    </div>
  );
};

export default Root1_7;
