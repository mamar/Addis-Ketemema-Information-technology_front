import fileTextFill from '@iconify/icons-eva/file-text-fill';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import { Icon } from '@iconify/react';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'ያለቁና እርካታ ያልተሞላላቸዉ',
    path: '/satisfaction',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'ያለቁና እርካታ የተሞላላቸዉ',
    path: '/finishshedTasksSatisfaction',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'የተጀመሩ አገልግሎቶች',
    path: '/ProgressTasksFor',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'አዲስ የተጠየቁ አገልግሎቶች',
    path: '/NewRequestsFor',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'የአገልግሉት መጠየቂያ ቅፅ',
    path: '/SendRequest',
    icon: getIcon(fileTextFill)
  }
  /*   {
    title: 'onprogress Request',
    path: '/dashboard/OnProgressRequest',
    icon: getIcon(fileTextFill)
  }, */
];

export default sidebarConfig;
