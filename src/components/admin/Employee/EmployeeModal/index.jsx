import { Alert, Popover, Select } from 'antd';
import {
   MainBranchOptions,
   MainServiceOptions,
   branchIndeficator,
   getServiceName,
   isDarkModeTrigger,
   returnUnderstandableDate,
   serviceIndetificator,
} from '@/utils/utils';
import {
   useDeleteEmployeeMutation,
   useEditEmployeeMutation,
   useLazyGetEmployeeListQuery,
} from '@/api/admin/employee_api';

import ModalWrapper from '@/components/admin/ModalWrapper';
import { alertComponents } from '@/utils/popoverHint';
import info_icon from '@/assets/svg/Info_icon.svg';
import styles from '@/assets/styles/admin/AllModal.module.scss';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { useState } from 'react';

const EmployeeModal = ({
   setIsModal,
   isModal,
   employee,
   windowList,
   branchList,
   serviceList,
   refetch,
}) => {
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const [newEmployee, setNewEmployee] = useState({
      ...employee,
      last_login: returnUnderstandableDate(employee.last_login, false),
   });

   const [deleteEmployee] = useDeleteEmployeeMutation();
   const [editEmployee] = useEditEmployeeMutation();
   const [getEmployeeList] = useLazyGetEmployeeListQuery();

   const [isFileChanged, setIsFileChanged] = useState(false);

   const [branchWindows, setBranchWindows] = useState(
      windowList?.filter((item) => item.branch === employee.branch)
   );

   const TBody = [
      {
         hintAlert: <Alert {...alertComponents.selectKeyWord} />,

         id: 1,
         title: 'Филиал*',
         data: employee.branch ? employee.branch : '-',
         name: 'branch',
         required: true,
      },
      {
         hintAlert: <Alert {...alertComponents.numberAny} />,
         id: 2,
         title: 'Окно*',
         data: employee.window?.length ? employee.window : undefined,
         name: 'window',
         required: true,
      },
      {
         hintAlert: <Alert {...alertComponents.positionKeyWords} />,
         id: 3,
         title: 'Должность*',
         data: employee.position,
         name: 'position',
         required: true,
      },
      {
         hintAlert: <Alert {...alertComponents.dateAny} />,
         id: 4,
         title: 'Смена',
         data: employee.shift?.length ? employee.shift : undefined,
         name: 'shift',
         required: false,
      },
      {
         hintAlert: <Alert {...alertComponents.stingAny} />,
         id: 5,
         title: 'Комментарий',
         data: employee.comment?.length ? employee.comment : undefined,
         name: 'comment',
         required: false,
      },
      {
         hintAlert: <Alert {...alertComponents.dataKeyText} />,
         id: 6,
         title: 'Последнее время логина',
         data: newEmployee.last_login,
         name: 'last_login',
         required: true,
      },
      {
         hintAlert: <Alert {...alertComponents.statusKeyWord} />,
         id: 7,
         title: 'Текущий статус*',
         data: employee.status,
         name: 'status',
         required: true,
      },
      {
         hintAlert: <Alert {...alertComponents.numberAny} />,
         id: 8,
         title: 'Максимальное количество переносов клиента',
         data: employee.max_transport,
         name: 'max_transport',
         required: false,
      },
      {
         hintAlert: <Alert {...alertComponents.selectKeyWord} />,
         id: 9,
         title: 'Очереди, которые обслуживает данный сотрудник*',
         data: serviceList?.length
            ? serviceList?.map((item) => ({
                 label: getServiceName(item?.name),
                 value: item?.id,
              }))
            : undefined,
         name: 'service',
         required: true,
      },
      {
         hintAlert: <Alert {...alertComponents.booleanKey} />,
         id: 10,
         title: 'Предусмотрен ли автоматический вызов клиента',
         data: employee.auto_call,
         name: 'auto_call',
         required: false,
      },
      {
         hintAlert: <Alert {...alertComponents.booleanKey} />,
         id: 11,
         title: 'Предусмотрен ли автоматический вызов клиента',
         data: employee.rating,
         name: 'rating',
         required: false,
      },
   ];

   const handleEdit = (name, value) => {
      if (name === 'image') {
         setNewEmployee((prev) => ({
            ...prev,
            [name]: value,
         }));
         setIsFileChanged(true);
      } else if (name === 'service') {
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

   const handleSave = async (e) => {
      e.preventDefault();
      const isosDate = returnUnderstandableDate(newEmployee.last_login, true);

      const editedEmployee = { ...newEmployee, last_login: isosDate };

      await editEmployee(editedEmployee);
      await refetch();
      setIsModal(false);
   };

   const serviceOptions = MainServiceOptions(serviceList, isDarkMode);

   const branchOptions = MainBranchOptions(branchList, isDarkMode);

   const windowOptions = branchWindows?.map((item) => ({
      label: <p style={isDarkModeTrigger(2, false, isDarkMode)}>{item.number}</p>,
      value: item.id,
   }));

   const handleDelete = async () => {
      await deleteEmployee(employee.id);
      await refetch();

      setIsModal(false);
   };

   const fileList = newEmployee?.image
      ? typeof newEmployee?.image === 'string'
         ? [
              {
                 uid: '-1',
                 name: 'image',
                 status: 'done',
                 url: newEmployee?.image,
                 thumbUrl: newEmployee?.image,
                 hideRemoveIcon: true,
              },
           ]
         : [
              {
                 ...newEmployee?.image,
                 thumbUrl: URL.createObjectURL(newEmployee?.image),
                 name: newEmployee?.image?.name,
                 hideRemoveIcon: true,
              },
           ]
      : [];

   return (
      <ModalWrapper isOpen={isModal} setIsOpen={setIsModal}>
         <div
            className={styles.employeeMain}
            onClick={(e) => e.stopPropagation()}
            style={{
               backgroundColor: isDarkMode ? '#374B67' : 'white',
            }}
         >
            <div className={styles.head} style={isDarkModeTrigger(3, true, isDarkMode)}>
               <p style={isDarkModeTrigger(3, false, isDarkMode)}>
                  {t('admin.employeeModal.username')}
               </p>
               <input
                  style={{ backgroundColor: 'transparent', color: isDarkMode ? 'lightgray' : '' }}
                  required={true}
                  defaultValue={newEmployee.username}
                  onChange={(e) => handleEdit('username', e.target.value)}
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

            <form className={styles.body} onSubmit={handleSave} action='submit'>
               {TBody.map((item) => (
                  <div className={styles.line} key={item.id}>
                     <p style={isDarkModeTrigger(3, false, isDarkMode)}>
                        {t(`admin.employeeModal.${item.name}`)}:
                     </p>
                     {item.name === 'service' ? (
                        <Select
                           dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
                           mode='multiple'
                           onChange={(value) => handleEdit('service', value)}
                           options={serviceOptions}
                           value={newEmployee.service}
                           style={{ width: '255px', marginRight: '40px' }}
                           defaultValue={serviceIndetificator(serviceList, employee.service)}
                        />
                     ) : item.name === 'branch' ? (
                        <Select
                           dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
                           onChange={(value) => handleEdit('branch', value)}
                           options={branchOptions}
                           style={{ width: '255px', marginRight: '40px' }}
                           defaultValue={branchIndeficator(branchList, employee.branch)}
                           value={newEmployee.branch}
                        />
                     ) : item.name === 'window' ? (
                        <Select
                           dropdownStyle={{ backgroundColor: isDarkMode ? '#455E83' : '' }}
                           onChange={(value) => handleEdit('window', value)}
                           options={windowOptions}
                           style={{ width: '255px', marginRight: '40px' }}
                           defaultValue={windowList?.find((window) => window.id === item.window)}
                           value={newEmployee.window}
                        />
                     ) : item.name === 'rating' ? (
                        <input
                           defaultValue={typeof item.data === 'undefined' ? '-' : item.data}
                           name={item.name}
                           onChange={(e) => handleEdit(item.name, e.target.value)}
                           readOnly
                           style={{ color: isDarkMode ? 'white' : '' }}
                        />
                     ) : (
                        <input
                           required={item.required}
                           defaultValue={typeof item.data === 'undefined' ? '-' : item.data}
                           name={item.name}
                           onChange={(e) => handleEdit(item.name, e.target.value)}
                           placeholder={
                              item.name === 'last_login'
                                 ? 'DD.MM HH:MM'
                                 : t(`admin.employeeModal.${item.name}`)
                           }
                           style={{ color: isDarkMode ? 'white' : '' }}
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
                     {t('buttons.delete')}
                  </button>
                  <button onClick={() => setIsModal(false)} type='button'>
                     {t('buttons.cancel')}
                  </button>
                  <button type='submit'>{t('buttons.save')}</button>
               </div>
            </form>
         </div>
      </ModalWrapper>
   );
};

export default EmployeeModal;
