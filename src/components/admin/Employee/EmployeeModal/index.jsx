import { Alert, DatePicker, Popover, Select, TimePicker } from 'antd';
import {
   CustomModalLoading,
   branchIndeficator,
   returnUnderstandableDate,
   selectModalStyles,
   serviceIndetificator,
} from '@/utils/utils';
import React, { useEffect, useState } from 'react';

import ModalWrapper from '@/components/admin/ModalWrapper';
import info_icon from '@/assets/svg/Info_icon.svg';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { useAdmin } from '@/services/adminStore';
import { useMain } from '@/services/MainStore';

const EmployeeModal = ({ setIsModal, isModal, employee }) => {
   const isDarkMode = useMain((state) => state.isDarkMode);

   const [newEmployee, setNewEmployee] = useState(employee);

   const isServiceListLoading = useAdmin((state) => state.isServiceListLoading);
   const serviceList = useAdmin((state) => state.serviceList);
   const getServiceList = useAdmin((state) => state.getServiceList);

   const deleteEmployee = useAdmin((state) => state.deleteEmployee);
   const editEmployee = useAdmin((state) => state.editEmployee);
   const getEmployeeList = useAdmin((state) => state.getEmployeeList);
   const getBranchList = useAdmin((state) => state.getBranchList);
   const branchList = useAdmin((state) => state.branchList);
   const isBranchListLoading = useAdmin((state) => state.getBranchList);

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
         data: employee.branch
            ? // ? branchList?.find((item) => item.id === employee.branch)[('city', 'address')]
              employee.branch
            : '-',
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
            <Alert message='Информация о текущем поле' type='info' showIcon description='Время' />
         ),
         id: 6,
         title: 'Последнее время логина',
         data: employee.last_login ? returnUnderstandableDate(employee.last_login) : undefined,
         name: 'last_login',
         required: true,
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
         id: 7,
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
         id: 8,
         title: 'Максимальное количество переносов клиента',
         data: employee.max_transport,
         name: 'max_transport',
         required: false,
      },
      {
         hintAlert: (
            <Alert message='Информация о текущем поле' type='info' showIcon description='...' />
         ),
         id: 9,
         title: 'Очереди, которые обслуживает данный сотрудник*',
         data: serviceList?.length
            ? serviceList?.map((item) => ({
                 label: item?.description,
                 value: item?.id,
              }))
            : undefined,
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
         id: 10,
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
         id: 11,
         title: 'Рейтинг сотрудника',
         data: employee.rating,
         name: 'rating',
         required: false,
      },
   ];

   const handleEdit = (name, value) => {
      if (name === 'service') {
         setNewEmployee((prev) => ({
            ...prev,
            [name]: [...value],
         }));
      } else {
         setNewEmployee((prev) => ({
            ...prev,
            [name]: value,
         }));
      }
   };

   useEffect(() => {
      getServiceList();
      getBranchList();
   }, []);

   const handleSave = async (e) => {
      e.preventDefault();
      const isosDate = new Date(newEmployee.last_login);
      console.log(isosDate);

      await editEmployee(employee.id, {
         ...newEmployee,
         last_login: isosDate.toISOString(),
      });
      await getEmployeeList();

      setIsModal(false);
   };

   const serviceOptions = serviceList?.map((item) => ({
      label: item?.name,
      value: item?.id,
   }));

   const branchOptions = branchList?.map((item) => ({
      label: `${item?.city}, ${item?.address}`,
      value: item?.id,
   }));

   const handleDelete = async () => {
      await deleteEmployee(employee.id);
      await getEmployeeList();

      setIsModal(false);
   };

   const serviceIndetificator = (service, serviseIdArray) => {
      const serviceNames = serviseIdArray.map((id) => {
         const foundService = serviceList.find((item) => item.id === id);
         return foundService ? foundService.name : null;
      });

      return serviceNames;
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
            {isServiceListLoading && isBranchListLoading ? (
               <CustomModalLoading />
            ) : (
               <form className={styles.body} onSubmit={handleSave}>
                  {TBody.map((item) => (
                     <div className={styles.line} key={item.id}>
                        <p>{item.title}:</p>
                        {item.name === 'service' ? (
                           <Select
                              mode='multiple'
                              onChange={(value) => handleEdit('service', value)}
                              options={serviceOptions}
                              style={{ width: '255px', marginRight: '40px' }}
                              defaultValue={serviceIndetificator(serviceList, employee.service)}
                              value={newEmployee.service}
                           />
                        ) : item.name === 'branch' ? (
                           <Select
                              onChange={(value) => handleEdit('branch', value)}
                              options={branchOptions}
                              style={{ width: '255px', marginRight: '40px' }}
                              defaultValue={employee.branch}
                           />
                        ) : (
                           <input
                              required={item.required}
                              defaultValue={typeof item.data === 'undefined' ? '-' : item.data}
                              name={item.name}
                              onChange={(e) => handleEdit(item.name, e.target.value)}
                              placeholder={item.name === 'last_login' ? 'MM.DD HH:MM' : item.title}
                           />
                        )}

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
                     <button onClick={handleDelete} type='button'>
                        Удалить
                     </button>
                     <button onClick={() => setIsModal(false)} type='button'>
                        Отмена
                     </button>
                     <button type='submit'>Сохранить</button>
                  </div>
               </form>
            )}
         </div>
      </ModalWrapper>
   );
};

export default EmployeeModal;
