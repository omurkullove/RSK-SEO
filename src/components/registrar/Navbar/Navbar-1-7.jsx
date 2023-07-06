import React from 'react';
import logo from '@/assets/png/logo.png';
import styles from '@/assets/styles/registrar/Header.module.scss';
import search from '@/assets/png/search.png';
import { Avatar } from 'antd';
import EN from '@/assets/png/EN.png';
import KG from '@/assets/png/KG.png';
import RU from '@/assets/png/RU.png';
import darkModeLogo from '@/assets/svg/darkModeLogo.svg';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useRegistrar } from '@/services/registrarStore';
import { UserOutlined } from '@ant-design/icons';
import { useMain } from '@/services/MainStore';

export const UserHeader = ({ employee, searchValue, setSearchValue }) => {
   const { t, i18n } = useTranslation();
   const [lang, setLang] = useState('ru');

   const handleChangeLanguage = (language) => {
      i18n.changeLanguage(language);
      setLang(language);
   };
   const isDarkMode = useMain((state) => state.isDarkMode);

   return (
      <div className={styles.user__header} style={{ backgroundColor: isDarkMode && '#455E83' }}>
         <div className='logo'>
            <img className={styles.main__logo} src={isDarkMode ? darkModeLogo : logo} alt='logo' />
         </div>

         <div className={styles.languages}>
            <img onClick={() => handleChangeLanguage('kg')} src={KG} alt='KG' />
            <img onClick={() => handleChangeLanguage('ru')} src={RU} alt='RU' />
            <img onClick={() => handleChangeLanguage('en')} src={EN} alt='EN' />
         </div>

         <div className='main__search'>
            <img className={styles.search__logo} src={search} alt='logo' />
            <input
               value={searchValue}
               onChange={(event) => setSearchValue(event.target.value)}
               className={styles.search__input}
               placeholder='Поиск по номеру талона'
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
