import { Button, Checkbox, Select, Upload } from 'antd';
import {
   MainBranchOptions,
   getServiceName,
   isDarkModeTrigger,
   selectModalStyles,
} from '@/utils/utils';
import { useCreateEmployeeMutation, useLazyGetEmployeeListQuery } from '@/api/admin/employee_api';

import ModalWrapper from '../../ModalWrapper';
import { UploadOutlined } from '@ant-design/icons';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CreateEmployeeModal = ({
   isCreateEmpModal,
   setIsCreateEmpModal,
   windowList,
   serviceList,
   branchList,
}) => {
   const [employee, setEmployee] = useState();

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [pp, setpp] = useState();

   const handleEdit = (name, value) => {
      const service = name === 'service' ? [...value] : value;

      if (name === 'image') {
         setpp(value);
      }

      setEmployee((prev) => ({
         ...prev,
         [name]: service,
      }));
   };

   const [createEmployee] = useCreateEmployeeMutation();
   const [getEmployeeList] = useLazyGetEmployeeListQuery();

   const handleSubmit = async (e) => {
      e.preventDefault();

      await createEmployee(employee);
      await getEmployeeList();

      setIsCreateEmpModal(false);
   };

   const serviceOptions = serviceList?.map((item) => ({
      label: <p className={isDarkMode ? 'dark_modeOption' : ''}>{getServiceName(item?.name)}</p>,
      value: item?.id,
   }));

   const branchOptions = MainBranchOptions(branchList, isDarkMode);

   const windowOptions = windowList?.map((item) => ({
      label: <p className={isDarkMode ? 'dark_modeOption' : ''}>{item.number}</p>,
      value: item.id,
   }));

   const fileList = pp
      ? [
           {
              ...pp,
              thumbUrl: URL.createObjectURL(pp),
              name: pp?.name,
           },
        ]
      : [];

   return (
      <ModalWrapper isOpen={isCreateEmpModal} setIsOpen={setIsCreateEmpModal}>
         <div
            className={styles.employeeCreateMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div
               className={styles.head}
               style={{
                  backgroundColor: isDarkMode ? '#374B67' : '',
               }}
            >
               <p
                  style={{
                     color: isDarkMode ? 'white' : '',
                  }}
               >
                  Создать сотрудника
               </p>
            </div>
            <form action='submit' onSubmit={handleSubmit}>
               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='email'>
                  {t('admin.employeeModal.email')}
               </label>
               <input
                  onChange={(e) => handleEdit('email', e.target.value)}
                  name='email'
                  type='email'
                  id='email'
                  placeholder={t('admin.employeeModal.email')}
                  maxLength={255}
                  autoComplete='current-email'
                  minLength={1}
                  required
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='password'>
                  {t('admin.employeeModal.password')}
               </label>
               <input
                  onChange={(e) => handleEdit('password', e.target.value)}
                  name='password'
                  type='password'
                  id='password'
                  placeholder={t('admin.employeeModal.password')}
                  maxLength={128}
                  minLength={1}
                  autoComplete='current-password'
                  required
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='username'>
                  {t('admin.employeeModal.username')}
               </label>
               <input
                  onChange={(e) => handleEdit('username', e.target.value)}
                  name='username'
                  type='text'
                  id='username'
                  placeholder={t('admin.employeeModal.username')}
                  maxLength={255}
                  minLength={1}
                  required
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='window'>
                  {t('admin.employeeModal.window')}
               </label>
               <Select
                  onChange={(value) => handleEdit('window', value)}
                  options={windowOptions}
                  bordered={false}
                  dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
                  style={{ ...selectModalStyles, marginTop: 0 }}
                  placeholder={t('admin.employeeModal.window')}
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='position'>
                  {t('admin.employeeModal.position')}
               </label>
               <input
                  onChange={(e) => handleEdit('position', e.target.value)}
                  name='position'
                  type='text'
                  id='position'
                  placeholder={t('admin.employeeModal.position')}
                  required
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='shift'>
                  {t('admin.employeeModal.shift')}
               </label>
               <input
                  onChange={(e) => handleEdit('shift', e.target.value)}
                  name='shift'
                  type='text'
                  id='shift'
                  placeholder={t('admin.employeeModal.shift')}
                  maxLength={100}
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='comment'>
                  {t('admin.employeeModal.comment')}
               </label>
               <input
                  onChange={(e) => handleEdit('comment', e.target.value)}
                  name='comment'
                  type='text'
                  id='comment'
                  placeholder={t('admin.employeeModal.comment')}
                  maxLength={100}
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='status'>
                  {t('admin.employeeModal.status')}
               </label>
               <input
                  onChange={(e) => handleEdit('status', e.target.value)}
                  name='status'
                  type='text'
                  id='status'
                  placeholder={t('admin.employeeModal.status')}
                  maxLength={255}
                  minLength={1}
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='max_transport'>
                  {t('admin.employeeModal.max_transport')}
               </label>
               <input
                  onChange={(e) => handleEdit('max_transport', parseInt(e.target.value))}
                  name='max_transport'
                  type='number'
                  id='max_transport'
                  placeholder={t('admin.employeeModal.max_transport')}
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='auto_call'>
                  {t('admin.employeeModal.auto_call')}
               </label>
               <Checkbox
                  onChange={(e) => handleEdit('auto_call', e.target.checked)}
                  defaultChecked={false}
                  name='auto_call'
                  type='checkbox'
                  id='auto_call'
                  placeholder={t('admin.employeeModal.auto_call')}
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='is_active'>
                  {t('admin.employeeModal.isActive')}
               </label>
               <Checkbox
                  onChange={(e) => handleEdit('is_active', e.target.checked)}
                  defaultChecked={false}
                  name='is_active'
                  type='checkbox'
                  id='is_active'
                  placeholder={t('admin.employeeModal.isActive')}
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='branch'>
                  {t('admin.employeeModal.branch')}
               </label>
               <Select
                  onChange={(value) => handleEdit('branch', parseInt(value))}
                  name='branch'
                  id='branch'
                  placeholder={t('admin.employeeModal.branch')}
                  options={branchOptions}
                  dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
                  style={(selectModalStyles, { marginTop: 0 })}
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='service'>
                  {t('admin.employeeModal.service')}
               </label>
               <Select
                  mode='multiple'
                  onChange={(value) => handleEdit('service', value)}
                  name='service'
                  id='service'
                  placeholder={t('admin.employeeModal.service')}
                  options={serviceOptions}
                  // value={employee?.service}
                  dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
                  style={(selectModalStyles, { marginTop: 0 })}
               />

               <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='last_login'>
                  {t('admin.employeeModal.last_login')}
               </label>
               <input
                  style={{ color: 'lightgray' }}
                  onChange={(e) => handleEdit('last_login', e.target.value)}
                  name='last_login'
                  type='datetime-local'
                  id='last_login'
                  placeholder={t('admin.employeeModal.last_login')}
               />
               <center style={{ display: 'flex', flexDirection: 'column' }}>
                  <label style={{ color: isDarkMode ? 'white' : '' }} htmlFor='image'>
                     Загрузите фото
                  </label>
                  <Upload
                     fileList={fileList}
                     onChange={(info) => handleEdit('image', info.fileList[0].originFileObj)}
                     customRequest={() => {}}
                     id='image'
                     listType='picture'
                     maxCount={1}
                  >
                     <Button
                        icon={<UploadOutlined />}
                        style={isDarkModeTrigger(2, true, isDarkMode)}
                     >
                        Upload
                     </Button>
                  </Upload>
               </center>

               <div className={styles.footer}>
                  <button onClick={() => setIsCreateEmpModal(false)}>{t('buttons.cancel')}</button>
                  <button type='submit'>{t('buttons.create')}</button>
               </div>
            </form>
         </div>
      </ModalWrapper>
   );
};

export default CreateEmployeeModal;
