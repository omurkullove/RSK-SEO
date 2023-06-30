import React from 'react';
import stlyes from '@/assets/styles/1.6/Sidebar.module.scss';

import userSVG from '@/assets/svg/sideUser.svg';
import settingSVG from '@/assets/svg/sideSet.svg';
import { Popover } from 'antd';
import { useTranslation } from 'react-i18next';

const Sidebar = () => {
   const { t } = useTranslation();

   const SIDE_ICONS = [
      {
         id: 1,
         icon: userSVG,
         path: '/',
         popover: {
            text: t('sidebar.popover.profile'),
         },
      },
      {
         id: 2,
         icon: settingSVG,
         path: '/',
         popover: {
            text: t('sidebar.popover.settings'),
         },
      },
   ];

   return (
      <div className={stlyes.main}>
         {SIDE_ICONS.map((item) => (
            <div key={item.id}>
               <Popover content={item.popover.text} placement='right'>
                  <img src={item.icon} alt={item.popover} />
               </Popover>
            </div>
         ))}
      </div>
   );
};

export default Sidebar;
