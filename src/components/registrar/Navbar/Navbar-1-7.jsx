import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import darkModeLogo from '@/assets/svg/darkModeLogo.svg';
import logo from '@/assets/png/logo.png';
import search from '@/assets/png/search.png';
import styles from '@/assets/styles/registrar/Header.module.scss';
import { useEffect } from 'react';
import { useGetProfileInfoQuery } from '@/api/general/auth_api';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const UserHeader = ({ searchValue, setSearchValue }) => {
   const { t, i18n } = useTranslation();

   const isDarkMode = useSelector((state) => state.toggleDarkMode.isDarkMode);
   const { data: employee, refetch } = useGetProfileInfoQuery();

   useEffect(() => {
      refetch();
   }, []);

   return (
      <div className={styles.user__header} style={{ backgroundColor: isDarkMode && '#455E83' }}>
         <div className='logo'>
            <img className={styles.main__logo} src={isDarkMode ? darkModeLogo : logo} alt='logo' />
         </div>

         <div className='main__search'>
            <img className={styles.search__logo} src={search} alt='logo' />
            <input
               value={searchValue}
               onChange={(event) => setSearchValue(event.target.value.toUpperCase())}
               className={styles.search__input}
               placeholder={t('navbar.searchTalon')}
               type='text'
               style={{
                  color: isDarkMode ? 'white' : 'black',
                  backgroundColor: isDarkMode ? '#374B67' : 'white',
               }}
            />
         </div>

         <div className={styles.avatarBlock}>
            <Avatar size={45} icon={<UserOutlined />} />
            <div className={styles.avatarChildBlock}>
               <p style={{ color: isDarkMode && 'white' }}>{employee?.username}</p>
               <p style={{ color: isDarkMode && '#92BFFF' }}>
                  {t('navbar.window')}: {employee?.window}
               </p>
            </div>
         </div>
      </div>
   );
};
