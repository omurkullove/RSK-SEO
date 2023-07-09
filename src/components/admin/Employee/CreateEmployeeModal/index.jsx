import React, { useEffect, useState } from 'react';
import ModalWrapper from '../../ModalWrapper';
import { useMain } from '@/services/MainStore';
import { selectModalStyles } from '@/utils/utils';
import { Checkbox, Select } from 'antd';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { useAdmin } from '@/services/adminStore';

const CreateEmployeeModal = ({ isCreateEmpModal, setIsCreateEmpModal }) => {
   const [employee, setEmployee] = useState();

   const isDarkMode = useMain((state) => state.isDarkMode);

   const isBranchListLoading = useAdmin((state) => state.isBranchListLoading);
   const branchList = useAdmin((state) => state.branchList);
   const getBranchList = useAdmin((state) => state.getBranchList);
   const isServiceListLoading = useAdmin((state) => state.isServiceListLoading);
   const serviceList = useAdmin((state) => state.serviceList);
   const getServiceList = useAdmin((state) => state.getServiceList);
   const createEmployee = useAdmin((state) => state.createEmployee);
   const getEmployeeList = useAdmin((state) => state.getEmployeeList);

   const handleEdit = (name, value) => {
      setEmployee((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      await createEmployee(JSON.parse(localStorage.getItem('token')), employee);
      await getEmployeeList(JSON.parse(localStorage.getItem('token')));

      setIsCreateEmpModal(false);
   };

   const serviceOptions = serviceList?.map((item) => ({
      label: item?.name,
      value: item?.id,
   }));

   const branchOptions = branchList?.map((item) => ({
      label: `${item?.city}, ${item?.address}`,
      value: item?.id,
   }));

   useEffect(() => {
      getBranchList(JSON.parse(localStorage.getItem('token')));
      getServiceList(JSON.parse(localStorage.getItem('token')));
   }, []);

   return (
      <ModalWrapper isOpen={isCreateEmpModal} setIsOpen={setIsCreateEmpModal}>
         <div
            className={styles.employeeCreateMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head}>
               <p>Создать сотрудника</p>
            </div>
            <form action='submit' onSubmit={handleSubmit}>
               {isBranchListLoading && isServiceListLoading ? (
                  <p>Loading...</p>
               ) : (
                  <>
                     <label htmlFor='email'>Email:</label>
                     <input
                        onChange={(e) => handleEdit('email', e.target.value)}
                        name='email'
                        type='email'
                        id='email'
                        placeholder='Эл. Почта'
                        maxLength={255}
                        autoComplete='current-email'
                        minLength={1}
                        required
                     />

                     <label htmlFor='password'>Пароль:</label>
                     <input
                        onChange={(e) => handleEdit('password', e.target.value)}
                        name='password'
                        type='password'
                        id='password'
                        placeholder='Пароль'
                        maxLength={128}
                        minLength={1}
                        autoComplete='current-password'
                        required
                     />

                     <label htmlFor='username'>ФИО:</label>
                     <input
                        onChange={(e) => handleEdit('username', e.target.value)}
                        name='username'
                        type='text'
                        id='username'
                        placeholder='ФИО'
                        maxLength={255}
                        minLength={1}
                        required
                     />

                     <label htmlFor='window'>Окно:</label>
                     <input
                        onChange={(e) => handleEdit('window', e.target.value)}
                        name='window'
                        type='text'
                        id='window'
                        placeholder='Окно'
                        maxLength={50}
                     />

                     <label htmlFor='position'>Position:</label>
                     <input
                        onChange={(e) => handleEdit('position', e.target.value)}
                        name='position'
                        type='text'
                        id='position'
                        placeholder='Position'
                        required
                     />

                     <label htmlFor='shift'>Перерыв:</label>
                     <input
                        onChange={(e) => handleEdit('shift', e.target.value)}
                        name='shift'
                        type='text'
                        id='shift'
                        placeholder='Перерыв'
                        maxLength={100}
                     />

                     <label htmlFor='comment'>Комментарий:</label>
                     <input
                        onChange={(e) => handleEdit('comment', e.target.value)}
                        name='comment'
                        type='text'
                        id='comment'
                        placeholder='Комментарий'
                        maxLength={100}
                     />

                     <label htmlFor='status'>Статус:</label>
                     <input
                        onChange={(e) => handleEdit('status', e.target.value)}
                        name='status'
                        type='text'
                        id='status'
                        placeholder='Статус'
                        maxLength={255}
                        minLength={1}
                     />

                     <label htmlFor='max_transport'>Ограничение переноса талонов:</label>
                     <input
                        onChange={(e) => handleEdit('max_transport', parseInt(e.target.value))}
                        name='max_transport'
                        type='number'
                        id='max_transport'
                        placeholder='Ограничение переноса талонов'
                     />

                     <label htmlFor='auto_call'>Авто вызов талона:</label>
                     <Checkbox
                        onChange={(e) => handleEdit('auto_call', e.target.checked)}
                        defaultChecked={false}
                        name='auto_call'
                        type='checkbox'
                        id='auto_call'
                        placeholder='Авто вызов талона'
                     />

                     <label htmlFor='is_staff'>Is staff:</label>
                     <Checkbox
                        onChange={(e) => handleEdit('is_staff', e.target.checked)}
                        defaultChecked={false}
                        name='is_staff'
                        type='checkbox'
                        id='is_staff'
                        placeholder='Is staff'
                     />

                     <label htmlFor='is_active'>Is active:</label>
                     <Checkbox
                        onChange={(e) => handleEdit('is_active', e.target.checked)}
                        defaultChecked={false}
                        name='is_active'
                        type='checkbox'
                        id='is_active'
                        placeholder='Is active'
                     />

                     <label htmlFor='branch'>Филиал:</label>
                     <Select
                        onChange={(value) => handleEdit('branch', parseInt(value))}
                        name='branch'
                        id='branch'
                        placeholder='Филиал'
                        options={branchOptions}
                        style={(selectModalStyles, { marginTop: 0 })}
                     />

                     <label htmlFor='service'>Услуги:</label>
                     <Select
                        onChange={(value) => handleEdit('service', [value])}
                        name='service'
                        id='service'
                        defaultValue={1}
                        placeholder='Услуги'
                        options={serviceOptions}
                        style={(selectModalStyles, { marginTop: 0 })}
                     />

                     <label htmlFor='last_login'>Последний вход:</label>
                     <input
                        onChange={(e) => handleEdit('last_login', e.target.value)}
                        name='last_login'
                        type='datetime-local'
                        id='last_login'
                        placeholder='Последний вход'
                     />
                  </>
               )}

               <div className={styles.footer}>
                  <button onClick={() => setIsCreateEmpModal(false)}>Отмена</button>
                  <button type='submit'>Создать</button>
               </div>
            </form>
         </div>
      </ModalWrapper>
   );
};

export default CreateEmployeeModal;
