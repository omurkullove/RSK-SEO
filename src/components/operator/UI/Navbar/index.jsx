import { useEffect, useState } from 'react';

import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import darkModeLogo from '@/assets/svg/darkModeLogo.svg';
import navLogo from '@/assets/svg/navLogo.svg';
import stlyes from '@/assets/styles/operator/Navbar.module.scss';
import { useGetProfileInfoQuery } from '@/api/general/auth_api';
import { useGetTalonQuery } from '@/api/operator/operator_api';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Navbar = ({}) => {
   const { data: talons, isLoading: isTalonsLoading } = useGetTalonQuery();

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);

   const { data: employee, refetch } = useGetProfileInfoQuery();

   const { t, i18n } = useTranslation();
   const [date, setDate] = useState('');

   const getDate = () => {
      const date = new Date();
      setDate(date.toLocaleDateString());
   };
   useEffect(() => {
      getDate();
      refetch();
   }, []);

   return (
      <div className={stlyes.main} style={{ backgroundColor: isDarkMode && '#455E83' }}>
         <div className={stlyes.head}>
            <div className={stlyes.block1}>
               <img src={isDarkMode ? darkModeLogo : navLogo} alt='logo' />
            </div>

            <div className={stlyes.avatarBlock}>
               <Avatar size={45} icon={<UserOutlined />} />
               <div className={stlyes.avatarChildBlock}>
                  <p style={{ color: isDarkMode && 'white' }}>{employee?.username}</p>
                  <p style={{ color: isDarkMode && '#92BFFF' }}>
                     {t('navbar.window')}: {employee?.window}
                  </p>
               </div>
            </div>
         </div>
         <div className={stlyes.footer}>
            <p style={{ color: isDarkMode && 'white' }}>
               {t('navbar.queue')}:{' '}
               {talons && !isTalonsLoading ? talons?.talons.length : t('noData')}
            </p>
            <p style={{ color: isDarkMode && 'white' }}>
               {t('navbar.date')}: {date}
            </p>
         </div>
      </div>
   );
};

export default Navbar;
