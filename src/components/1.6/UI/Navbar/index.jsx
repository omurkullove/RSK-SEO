import React from 'react';
import stlyes from '@/assets/styles/1.6/Navbar.module.scss';
import { Avatar } from 'antd';

const Navbar = () => {
   return (
      <div className={stlyes.main}>
         <div className={stlyes.head}>
            <div className={stlyes.logoBlock}>
               {/* <img src='' alt='logo' /> */}
               <p>123</p>
            </div>
            <div className={stlyes.avatarBlock}>
               <Avatar size={45} icon />
               <div className={stlyes.avatarChildBlock}>
                  <p>Алина Тен</p>
                  <p>Окно: 4</p>
               </div>
            </div>
         </div>
         <div className={stlyes.footer}>
            <p>Очередь: #102</p>
            <p>Дата:21.06.2023</p>
         </div>
      </div>
   );
};

export default Navbar;
