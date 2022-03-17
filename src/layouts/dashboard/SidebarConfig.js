import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import { Divider } from '@mui/material';
// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'ፅ/ቤት',
    path: '/dashboard/Office',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'ስታንዳርድ',
    path: '/dashboard/StandardList',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'ሁሉም የተጠየቁ ስራዎች',
    path: '/dashboard/AllRequest',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'አዲስ የተጠየቁ ስራዎች',
    path: '/dashboard/NewRequest',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'የተጀመሩ ስራዎች',
    path: '/dashboard/assignedRequest',
    icon: getIcon(fileTextFill)
  },
  /*   {
    title: 'onprogress Request',
    path: '/dashboard/OnProgressRequest',
    icon: getIcon(fileTextFill)
  }, */
  {
    title: 'መፍትሄ የተሰጣቸዉ ስራዎች',
    path: '/dashboard/SolutionofferedRequest',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'አፈጻጸም',
    path: '/dashboard/Performance',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'የባለሙያ ስታንዳረድ መዉጫ',
    path: '/dashboard/StandardUser',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Register',
    path: '/dashboard/register',
    icon: getIcon(personAddFill)
  },
  {
    title: 'ማሳሰቢያ',
    path: '/dashboard/Announcement',
    icon: getIcon(fileTextFill)
  }

  /*  {
    title: 'Not found',
    path: '/404',
    icon: getIcon(alertTriangleFill)
  } */
];

export default sidebarConfig;
