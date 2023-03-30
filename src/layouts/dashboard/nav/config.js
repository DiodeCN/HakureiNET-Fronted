import { Icon } from '@mui/material';
import {
  AnalyticsOutlined as AnalyticsIcon,
  PersonOutlined as PersonIcon,
  LockOutlined as LockIcon,
  AccountCircleOutlined as AboutIcon,
} from '@mui/icons-material';

// ...

const icon = (name) => {
  switch (name) {
    case 'ic_analytics':
      return <Icon component={AnalyticsIcon} sx={{ width: 1, height: 1 }} />;
    case 'ic_user':
      return <Icon component={PersonIcon} sx={{ width: 1, height: 1 }} />;
    case 'ic_lock':
      return <Icon component={LockIcon} sx={{ width: 1, height: 1 }} />;
      case 'ic_about':
      return <Icon component={AboutIcon} sx={{ width: 1, height: 1 }} />;
    default:
      return null;
  }
};

const navConfig = [
  {
    title: '控制面板',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: '家庭环境',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: '关于网站',
    path: '/dashboard/about',
    icon: icon('ic_about'),
  },
  {
    title: '绑定新设备',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
