import React, { useState } from 'react';
import styles from '@/assets/styles/operator/Sidebar.module.scss';

import { Image, Input, Menu, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import Sider from 'antd/es/layout/Sider';
import {
   UserOutlined,
   SettingOutlined,
   HomeOutlined,
   CaretDownOutlined,
   DownOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useOperator } from '@/services/operatorStore';

const Sidebar = () => {
   const navigate = useNavigate();

   const employee = useOperator((state) => state.employee);

   const [collapsed, setCollapsed] = useState(true);

   const { t } = useTranslation();

   const ITEMS = [
      {
         title: 'Пользователь',
         label: 'Сотрудник',
         key: 123,
         icon: <UserOutlined style={{ fontSize: '20px', color: 'white' }} />,
         children: [
            {
               key: 1,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        Имя
                        <div>{employee?.username}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 2,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        Должность
                        <div>{employee?.position === 'registrar' ? 'Регистратор' : 'Оператор'}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 3,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        Статус
                        <div>{employee?.status === 'active' ? 'Активный' : 'Не активный'}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 4,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        Услуга
                        <div>
                           {employee?.service?.map((item) => (
                              <p key={item?.id}>{item?.name}</p>
                           ))}
                        </div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 5,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        Окно
                        <div>№{employee?.window}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
         ],
      },
      {
         key: 2,
         icon: <SettingOutlined style={{ fontSize: '20px', color: 'white' }} />,
         label: 'Настройки',
         // children: [],
      },
   ];

   return (
      <Sider
         width={350}
         collapsible
         collapsed={collapsed}
         onCollapse={setCollapsed}
         trigger={null}
         style={{
            height: '100vh',
            minHeight: '100%',
            overflow: 'auto',
            backgroundColor: '#1e4a89',
         }}
      >
         <Menu
            triggerSubMenuAction=''
            className='custom-menu'
            mode='inline'
            onClick={() => setCollapsed(!collapsed)}
            items={ITEMS}
            subMenuOpenDelay={0.5}
            expandIcon={({ isOpen }) => (
               <DownOutlined style={{ color: 'white' }} rotate={isOpen ? 0 : 180} />
            )}
         />
      </Sider>
   );
};

export default Sidebar;
