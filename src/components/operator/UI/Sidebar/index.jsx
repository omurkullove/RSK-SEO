import { DownOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { branchIndeficator, getServiceName } from '@/utils/utils';
import { useDispatch, useSelector } from 'react-redux';

import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Switch } from 'antd';
import defaultUserIcon from '@/assets/png/defaultUserIcon.png';
import en from '@/assets/svg/en.svg';
import kg from '@/assets/svg/kg.svg';
import ru from '@/assets/svg/ru.svg';
import styles from '@/assets/styles/operator/Sidebar.module.scss';
import { toggleDarkMode } from '@/api/synchronous';
import { useGetBranchListQuery } from '@/api/registrar/registrar_api';
import { useGetProfileInfoQuery } from '@/api/general/auth_api';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
   const navigate = useNavigate();

   const { data: employee, isLoading } = useGetProfileInfoQuery();

   const [collapsed, setCollapsed] = useState(true);

   const { t, i18n } = useTranslation();

   const dispatch = useDispatch();
   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const { data: branchList, isLoading: isBranchListLoading } = useGetBranchListQuery();

   const onChange = (checked) => {
      dispatch(toggleDarkMode(checked));

      console.log(isDarkMode);
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
               key: 12,
               label: (
                  <div className={styles.childrenImgBlock}>
                     <img
                        src={
                           employee?.image
                              ? `http://0.0.0.0:8000/${employee?.image}`
                              : defaultUserIcon
                        }
                     />
                  </div>
               ),
               type: 'group',
            },
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
                        <div>
                           {employee?.status === 'active'
                              ? t('status.active')
                              : t('status.noActive')}
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
                        {t('sidebar.service')}
                        <div
                           style={{
                              flexDirection: employee?.service?.length ? 'column' : 'row',
                              alignItems: employee?.service?.length ? 'flex-start' : 'center',
                              gap: '5px',
                           }}
                        >
                           {employee?.service?.length ? (
                              employee?.service?.map((item, index) => (
                                 <p key={index}>- {getServiceName(item?.name)}</p>
                              ))
                           ) : (
                              <p>{t('noData')}</p>
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
                        <div>{employee?.window ? employee?.window : t('noData')}</div>
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
                        <div>{employee?.shift ? employee?.shift : t('noData')}</div>
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
                        <div>{branchIndeficator(branchList, employee?.branch)}</div>
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
                     {t('chooseLanguage')}
                     <div
                        onClick={() => handleChangeLanguage('kg')}
                        style={{ backgroundColor: lang === 'kg' ? '#136E37' : '' }}
                     >
                        <img src={kg} />
                        <p>{t('kg')}</p>
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
                     <p>{t('ru')}</p>
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
                     <p>{t('en')}</p>
                  </div>
               ),
            },
            {
               key: 13,
               type: 'group',
               label: (
                  <div className={styles.switchBlock}>
                     {t('darkMode')}
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
