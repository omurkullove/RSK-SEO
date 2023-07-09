import React, { useState } from 'react';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { useMain } from '@/services/MainStore';
import { branchIndeficator, serviceIndetificator } from '@/utils/utils';
import info_icon from '@/assets/svg/Info_icon.svg';
import { Popover, Alert } from 'antd';
import { useAdmin } from '@/services/adminStore';
import ModalWrapper from '@/components/admin/ModalWrapper';

const QueueModal = ({ isQueModal, setIsQueModal, queue }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);

   const [newQueue, setNewQueue] = useState(queue);

   const TBody = [
      {
         hintAlert: () => (
            <Alert
               type='warning'
               message='Информация о текущем поле'
               description='Желательно не изменять'
               showIcon
            />
         ),
         id: 1,
         title: 'ID',
         data: queue.id,
         name: 'id',
      },
      {
         hintAlert: () => (
            <Alert
               message='Информация о текущем поле'
               description='Любое значение'
               showIcon
               type='info'
            />
         ),
         id: 2,
         title: 'Описание',
         data: queue.description ? queue.description : undefined,
         name: 'description',
      },
      {
         hintAlert: () => (
            <Alert
               message='Информация о текущем поле'
               description='Ключевые числа и их значения :
               1 - Кредитование; 
               2 - Обмен валюты;
               3 - Денежные переводы;
               4 - Выдача карт;
               5 - Получение перевода;
               6 - Открытие счета;
               7 - Операции с ценными бумагами;
               8 - Исламское финансирование;
               '
               showIcon
            />
         ),
         id: 3,
         title: 'Услуга',
         data: queue.description ? queue.description : undefined,
         name: 'service',
      },
      {
         hintAlert: () => (
            <Alert
               message='Информация о текущем поле'
               description='
         Ключевые чила и их значения:
         1 - Бишкек, Киевская 77
         2 - Каракол, Кулакунова 89
         3 - Ош, Курманжан датка 124
         '
               showIcon
            />
         ),
         id: 4,
         title: 'Филиал',
         data: branchIndeficator(queue.branch),
         name: 'branch',
      },
      {
         hintAlert: () => <Alert message='Информация о текущем поле' description='' showIcon />,
         id: 5,
         title: 'Всего талонов',
         data: queue.talon_count,
         name: 'talon_count',
      },
   ];

   const handleEdit = (e) => {
      const { value, name } = e.target;

      setNewQueue((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const deleteQueue = useAdmin((state) => state.deleteQueue);
   const getQueueList = useAdmin((state) => state.getQueueList);

   const handleSave = (e) => {
      e.preventDefault();
   };
   const handleDelete = async (e, id) => {
      e.preventDefault();
      await deleteQueue(JSON.parse(localStorage.getItem('token')), id);
      await getQueueList(JSON.parse(localStorage.getItem('token')));
   };

   return (
      <ModalWrapper isOpen={isQueModal} setIsOpen={setIsQueModal}>
         <div
            className={styles.queueMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head}>
               <input
                  defaultValue={queue.description}
                  onChange={(e) => handleEdit(e)}
                  name='service'
               />
               <img src={info_icon} alt='info' style={{ width: '24px', cursor: 'pointer' }} />
            </div>

            <form className={styles.body} onSubmit={handleSave} action='submit'>
               {TBody.map((item) => (
                  <div className={styles.line} key={item.id}>
                     <p>{item.title}:</p>

                     <input
                        name={item.name}
                        defaultValue={typeof item.data === 'undefined' ? '-' : item.data}
                        onChange={(e) => handleEdit(e)}
                     />
                     <img src={info_icon} alt='info' style={{ width: '24px', cursor: 'pointer' }} />
                  </div>
               ))}
               <div className={styles.footer}>
                  <button onClick={(e) => handleDelete(e, newQueue.id)} type='reset'>
                     Удалить
                  </button>
                  <button onClick={() => setIsQueModal(false)} type='reset'>
                     Отмена
                  </button>
                  <button type='submit'>Сохранить</button>
               </div>
            </form>
         </div>
      </ModalWrapper>
   );
};

export default QueueModal;
