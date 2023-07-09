import React, { useState } from 'react';
import styles from '@/assets/styles/operator/Sidebar.module.scss';

import { Image, Input, Menu, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import { Switch } from 'antd';
import Sider from 'antd/es/layout/Sider';
import kg from '@/assets/svg/kg.svg';
import en from '@/assets/svg/en.svg';
import ru from '@/assets/svg/ru.svg';
import {
   UserOutlined,
   SettingOutlined,
   HomeOutlined,
   CaretDownOutlined,
   DownOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useOperator } from '@/services/operatorStore';
import { useMain } from '@/services/MainStore';
import { branchIndeficator } from '@/utils/utils';

const Sidebar = () => {
   const navigate = useNavigate();

   const employee = useMain((state) => state.employee);

   const [collapsed, setCollapsed] = useState(true);

   const { t, i18n } = useTranslation();

   const toggleDarkMode = useMain((state) => state.toggleDarkMode);
   const isDarkMode = useMain((state) => state.isDarkMode);

   const onChange = (checked) => {
      toggleDarkMode(checked);
   };

   const [lang, setLang] = useState('ru');
   const handleChangeLanguage = (language) => {
      i18n.changeLanguage(language);
      setLang(language);
   };

   const ITEMS = [
      {
         title: 'Пользователь',
         label: t('sidebar.employee'),
         key: 1,
         icon: <UserOutlined style={{ fontSize: '20px', color: 'white' }} />,
         children: [
            {
               key: 2,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        {t('sidebar.name')}
                        <div>{employee?.username}</div>
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
                        {t('sidebar.position')}
                        <div>{employee?.position}</div>
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
                        {t('sidebar.status')}
                        <div>{employee?.status === 'active' ? 'Активный' : 'Не активный'}</div>
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
                        {t('sidebar.service')}
                        <div>
                           {employee?.service?.length ? (
                              employee?.service?.map((item) => <p key={item?.id}>{item?.name}</p>)
                           ) : (
                              <p>Нет данных</p>
                           )}
                        </div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 6,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        {t('sidebar.window')}
                        <div>№{employee?.window}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 7,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        {t('sidebar.shiftTime')}
                        <div>{employee?.shift}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
            {
               key: 8,
               label: (
                  <div className={styles.childrenBlock}>
                     <label>
                        {t('sidebar.branch')}
                        <div>{employee?.branch}</div>
                     </label>
                  </div>
               ),
               type: 'group',
            },
         ],
      },
      {
         key: 9,
         icon: <SettingOutlined style={{ fontSize: '20px', color: 'white' }} />,
         label: t('sidebar.settings'),
         children: [
            {
               key: 10,
               type: 'group',
               label: (
                  <label className={styles.langlable}>
                     Выберите язык
                     <div
                        onClick={() => handleChangeLanguage('kg')}
                        style={{ backgroundColor: lang === 'kg' ? '#136E37' : '' }}
                     >
                        <img src={kg} />
                        <p>Кыргызча</p>
                     </div>
                  </label>
               ),
            },
            {
               key: 11,
               type: 'group',
               label: (
                  <div
                     style={{ backgroundColor: lang === 'ru' ? '#136E37' : '' }}
                     className={styles.langBlock}
                     onClick={() => handleChangeLanguage('ru')}
                  >
                     <img src={ru} alt='ru' />
                     <p>Русский</p>
                  </div>
               ),
            },
            {
               key: 12,
               type: 'group',
               label: (
                  <div
                     style={{ backgroundColor: lang === 'en' ? '#136E37' : '' }}
                     className={styles.langBlock}
                     onClick={() => handleChangeLanguage('en')}
                  >
                     <img src={en} alt='en' />
                     <p>English</p>
                  </div>
               ),
            },
            {
               key: 13,
               type: 'group',
               label: (
                  <div className={styles.switchBlock}>
                     Ночная тема
                     <Switch onChange={onChange} checked={isDarkMode} />
                  </div>
               ),
            },
         ],
      },
   ];

   return (
      <Sider
         width={350}
         onMouseLeave={() => setCollapsed(true)}
         onMouseEnter={() => setCollapsed(false)}
         collapsible
         collapsed={collapsed}
         onCollapse={setCollapsed}
         trigger={null}
         style={{
            height: '100vh',
            minHeight: '100%',
            overflow: 'auto',
            backgroundColor: isDarkMode ? '#001F31' : '#1e4a89',
            zIndex: 999,
         }}
      >
         <Menu
            triggerSubMenuAction=''
            className='custom-menu'
            style={{
               backgroundColor: isDarkMode ? '#001F31' : '#1e4a89',
            }}
            mode='inline'
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
