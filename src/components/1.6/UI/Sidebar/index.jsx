import React from 'react';
import stlyes from '@/assets/styles/1.6/Sidebar.module.scss';

import userSVG from '@/assets/svg/sideUser.svg';
import settingSVG from '@/assets/svg/sideSet.svg';
import { Popover } from 'antd';

const Sidebar = () => {
   const SIDE_ICONS = [
      {
         id: 1,
         icon: userSVG,
         path: '/',
         popover: 'Profile',
      },
      {
         id: 2,
         icon: settingSVG,
         path: '/',
         popover: 'Settings',
      },
   ];

   return (
      <div className={stlyes.main}>
         {SIDE_ICONS.map((item) => (
            <div key={item.id}>
               <Popover content={item.popover} placement='right'>
                  <img src={item.icon} alt={item.popover} />
               </Popover>
            </div>
         ))}
      </div>
   );
};

export default Sidebar;
