import React, { useEffect, useState } from 'react';
import stlyes from '@/assets/styles/operator/Navbar.module.scss';
import { Avatar } from 'antd';
import { useTranslation } from 'react-i18next';
import navLogo from '@/assets/svg/navLogo.svg';
import kg from '@/assets/svg/kg.svg';
import en from '@/assets/svg/en.svg';
import ru from '@/assets/svg/ru.svg';
import { useOperator } from '@/services/operatorStore';

const Navbar = ({ employee }) => {
   const talons = useOperator((state) => state.talons);

   const { t, i18n } = useTranslation();
   const [lang, setLang] = useState('ru');
   const [date, setDate] = useState('');

   const handleChangeLanguage = (language) => {
      i18n.changeLanguage(language);
      setLang(language);
   };

   const getDate = () => {
      const date = new Date();
      setDate(date.toLocaleDateString());
   };
   useEffect(() => {
      getDate();
   }, []);

   return (
      <div className={stlyes.main}>
         <div className={stlyes.head}>
            <div className={stlyes.block1}>
               <img src={navLogo} alt='logo' />
               <img
                  src={kg}
                  alt='kg'
                  onClick={() => handleChangeLanguage('kg')}
                  style={{ cursor: 'pointer' }}
               />
               <img
                  src={ru}
                  alt='ru'
                  onClick={() => handleChangeLanguage('ru')}
                  style={{ cursor: 'pointer' }}
               />
               <img
                  src={en}
                  alt='en'
                  onClick={() => handleChangeLanguage('en')}
                  style={{ cursor: 'pointer' }}
               />
            </div>
            <div className={stlyes.avatarBlock}>
               <Avatar size={45} icon />
               <div className={stlyes.avatarChildBlock}>
                  <p>{employee?.username}</p>
                  <p>Окно: {employee.window}</p>
               </div>
            </div>
         </div>
         <div className={stlyes.footer}>
            <p>
               {t('navbar.queue')}: {talons ? talons.length : 'Нет данных'}
            </p>
            <p>
               {t('navbar.date')}: {date}
            </p>
         </div>
      </div>
   );
};

export default Navbar;
