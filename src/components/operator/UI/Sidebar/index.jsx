import React, { useState } from 'react';
import stlyes from '@/assets/styles/operator/Sidebar.module.scss';

import userSVG from '@/assets/svg/sideUser.svg';
import settingSVG from '@/assets/svg/sideSet.svg';
import { Image, Input, Menu, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import Sider from 'antd/es/layout/Sider';
import { UserOutlined, SettingOutlined, HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

const Sidebar = () => {
   const navigate = useNavigate();

   const { t } = useTranslation();
   function getItem(label, key, icon) {
      return {
         key,
         icon,
         label,
      };
   }

   const SIDE_ICONS = [
      getItem(
         t('sidebar.popover.profile'),
         '1',
         <UserOutlined style={{ fontSize: '20px', color: 'white' }} />
      ),
      getItem(
         t('sidebar.popover.settings'),
         '2',
         <SettingOutlined style={{ fontSize: '20px', color: 'white' }} />
      ),
   ];

   const [collapsed, setCollapsed] = useState(true);

   return (
      <Sider
         width={400}
         collapsible
         collapsed={collapsed}
         onCollapse={setCollapsed}
         trigger={null}
         style={{
            height: '100vh',
            minHeight: '100%',
            overflow: 'auto',
            backgroundColor: '#1e4a89',
         }}
      >
         <Menu
            defaultSelectedKeys={1}
            className='custom-menu'
            mode='inline'
            onClick={() => setCollapsed(!collapsed)}
            items={SIDE_ICONS}
         />
      </Sider>
   );
};

export default Sidebar;
