import React, { useState } from 'react';
import stlyes from '@/assets/styles/1.6/Navbar.module.scss';
import { Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import navLogo from '@/assets/svg/navLogo.svg';

const Navbar = () => {
   const { t, i18n } = useTranslation();
   const [lang, setLang] = useState('ru');

   const handleChangeLanguage = (language) => {
      i18n.changeLanguage(language);
      setLang(language);
   };

   return (
      <div className={stlyes.main}>
         <div className={stlyes.head}>
            <img src={navLogo} alt='logo' />
            <div className={stlyes.avatarBlock}>
               <Avatar size={45} icon />
               <div className={stlyes.avatarChildBlock}>
                  <p>Алина Тен</p>
                  <p>Окно: 4</p>
               </div>
            </div>
         </div>
         <div className={stlyes.footer}>
            <p>{t('navbar.queue')}: #102</p>
            <p>{t('navbar.date')}: 21.06.2023</p>

            <button
               onClick={() => handleChangeLanguage('ru')}
               style={{
                  fontWeight: '800',
                  background: 'gray',
                  padding: '5px',
                  cursor: 'pointer',
                  color: lang === 'ru' ? 'green' : '',
               }}
            >
               russian
            </button>
            <button
               onClick={() => handleChangeLanguage('en')}
               style={{
                  fontWeight: '800',
                  background: 'gray',
                  padding: '5px',
                  cursor: 'pointer',
                  color: lang === 'en' ? 'green' : '',
               }}
            >
               english
            </button>
            <button
               onClick={() => handleChangeLanguage('kg')}
               style={{
                  fontWeight: '800',
                  background: 'gray',
                  padding: '5px',
                  cursor: 'pointer',
                  color: lang === 'kg' ? 'green' : '',
               }}
            >
               kyrgyz
            </button>
         </div>
      </div>
   );
};

export default Navbar;
