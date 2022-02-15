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
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Office',
    path: '/dashboard/Office',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'AllRequest',
    path: '/dashboard/AllRequest',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'New Request',
    path: '/dashboard/NewRequest',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Assigned Request',
    path: '/dashboard/assignedRequest',
    icon: getIcon(fileTextFill)
  },
  /*   {
    title: 'onprogress Request',
    path: '/dashboard/OnProgressRequest',
    icon: getIcon(fileTextFill)
  }, */
  {
    title: 'Soltion Offered Request',
    path: '/dashboard/SolutionofferedRequest',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Performance',
    path: '/dashboard/Performance',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'register',
    path: '/dashboard/register',
    icon: getIcon(personAddFill)
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon(alertTriangleFill)
  }
];

export default sidebarConfig;
