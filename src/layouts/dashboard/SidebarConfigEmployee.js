import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
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
    path: '/finishshedTasksSatisfaction"',
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
    icon: getIcon(peopleFill)
  },
  {
    title: 'አዲስ የተጠየቁ ስራዎች',
    path: '/dashboard/NewRequest',
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
