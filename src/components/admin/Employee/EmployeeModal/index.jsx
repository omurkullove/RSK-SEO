import { useMain } from '@/services/MainStore';
import React, { useState } from 'react';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import info_icon from '@/assets/svg/Info_icon.svg';
import { branchIndeficator, serviceIndetificator } from '@/utils/utils';
import { Alert, Popover } from 'antd';
import ModalWrapper from '@/components/admin/ModalWrapper';
import { useAdmin } from '@/services/adminStore';

const EmployeeModal = ({ setIsModal, isModal, employee }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);

   const [newEmployee, setNewEmployee] = useState(employee);

   const deleteEmployee = useAdmin((state) => state.deleteEmployee);
   const getEmployeeList = useAdmin((state) => state.getEmployeeList);

   const TBody = [
      {
         hintAlert: (
            <Alert
               message='Информация о текущем поле'
               type='info'
               showIcon
               description='Строка, любое значение'
            />
         ),
         id: 1,
         title: 'Филиал*',
         data: employee.branch ? branchIndeficator(employee.branch) : '-',
         name: 'branch',
         required: true,
      },
      {
         hintAlert: (
            <Alert
               message='Информация о текущем поле'
               type='info'
               showIcon
               description='число, любое значение'
            />
         ),
         id: 2,
         title: 'Окно*',
         data: employee.window.length ? employee.window : undefined,
         name: 'window',
         required: true,
      },
      {
         hintAlert: (
            <Alert
               message='Информация о текущем поле'
               type='info'
               showIcon
               description='Ключевое слово: "registrar, operator, admin"'
            />
         ),
         id: 3,
         title: 'Должность*',
         data: employee.position,
         name: 'position',
         required: true,
      },
      {
         hintAlert: (
            <Alert
               message='Информация о текущем поле'
               type='info'
               showIcon
               description='Дата, любое значение, например: 12:45-15:00'
            />
         ),
         id: 4,
         title: 'Смена',
         data: employee.shift.length ? employee.shift : undefined,
         name: 'shift',
         required: false,
      },
      {
         hintAlert: (
            <Alert
               message='Информация о текущем поле'
               type='info'
               showIcon
               description='Любое значение'
            />
         ),
         id: 5,
         title: 'Комментарий',
         data: employee.comment.length ? employee.comment : undefined,
         name: 'comment',
         required: false,
      },
      {
         hintAlert: (
            <Alert
               message='Информация о текущем поле'
               type='info'
               showIcon
               description='Ключевое слово: active или no active'
            />
         ),
         id: 6,
         title: 'Текущий статус*',
         data: employee.status,
         name: 'status',
         required: true,
      },
      {
         hintAlert: (
            <Alert
               message='Информация о текущем поле'
               type='info'
               showIcon
               description='Число, любое значение'
            />
         ),
         id: 7,
         title: 'Максимальное количество переносов клиента',
         data: employee.max_transport,
         name: 'max_transport',
         required: false,
      },
      {
         hintAlert: (
            <Alert message='Информация о текущем поле' type='info' showIcon description='...' />
         ),
         id: 8,
         title: 'Очереди, которые обслуживает данный сотрудник*',
         data: employee.service.length ? employee.service.map((item) => item) : undefined,
         name: 'service',
         required: true,
      },
      {
         hintAlert: (
            <Alert
               message='Информация о текущем поле'
               type='info'
               showIcon
               description='Логическое значение: true или false'
            />
         ),
         id: 9,
         title: 'Предусмотрен ли автоматический вызов клиента',
         data: employee.auto_call,
         name: 'auto_call',
         required: false,
      },
      {
         hintAlert: (
            <Alert
               message='Информация о текущем поле'
               type='info'
               showIcon
               description='Число, например: 4.7'
            />
         ),
         id: 10,
         title: 'Рейтинг сотрудника',
         data: employee.rating,
         name: 'rating',
         required: false,
      },
   ];

   const handleEdit = (e) => {
      setIsStartEdit(true);
      const { value, name } = e.target;
      setNewEmployee((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSave = (e) => {
      e.preventDefault();
      console.log(newEmployee);
   };

   const handleDelete = async () => {
      await deleteEmployee(JSON.parse(localStorage.getItem('token')), employee.id);
      await getEmployeeList(JSON.parse(localStorage.getItem('token')));

      setIsModal(false);
   };

   return (
      <ModalWrapper isOpen={isModal} setIsOpen={setIsModal}>
         <div
            className={styles.employeeMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head}>
               <p>Сотрудник:</p>
               <input
                  required={true}
                  defaultValue={newEmployee.username}
                  onChange={(e) => handleEdit(e)}
                  name='username'
                  type='text'
               />
               <Popover
                  trigger={'hover'}
                  content={() => (
                     <Alert
                        description='Строка, любое значение'
                        type='info'
                        showIcon
                        message='Информация о текущем поле'
                     />
                  )}
               >
                  <img src={info_icon} alt='edit' style={{ width: '24px', cursor: 'pointer' }} />
               </Popover>
            </div>
            <form className={styles.body} onSubmit={handleSave}>
               {TBody.map((item) => (
                  <div className={styles.line} key={item.id}>
                     <p>{item.title}:</p>
                     <input
                        required={item.required}
                        defaultValue={typeof item.data === 'undefined' ? '-' : item.data}
                        name={item.name}
                        type='text'
                        onChange={(e) => handleEdit(e)}
                     />
                     <Popover content={item.hintAlert} trigger={'hover'}>
                        <img
                           src={info_icon}
                           alt='edit'
                           style={{ width: '24px', cursor: 'pointer' }}
                        />
                     </Popover>
                  </div>
               ))}
               <div className={styles.footer}>
                  <button onClick={handleDelete} type='reset'>
                     Удалить
                  </button>
                  <button onClick={() => setIsModal(false)} type='reset'>
                     Отмена
                  </button>
                  <button type='submit'>Сохранить</button>
               </div>
            </form>
         </div>
      </ModalWrapper>
   );
};

export default EmployeeModal;
