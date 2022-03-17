import { Navigate, useRoutes, useNavigate, Route } from 'react-router-dom';
// layouts
import { useState } from 'react';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Users/Login';
import Register from './pages/Users/Register';
import DashboardApp from './pages/DashboardApp';
import AllRequest from './pages/RequestAdmin/AllRequest';
import Blog from './pages/Blog';
import User from './pages/Users/User';
import NotFound from './pages/Page404';
import NewRequest from './pages/RequestAdmin/NewRequst';
import AssignedRequest from './pages/RequestAdmin/AssignedRequest';
// import OnProgressRequest from './pages/OnProgressRequest';
import SolutionofferedRequest from './pages/RequestAdmin/SolutionofferedRequest';
import Office from './pages/Office/office';
import Officeform from './components/authentication/office/Officeform';
import SendRequest from './pages/Employee/SendRequest';
import AddOffice from './pages/Office/AddOffice';
import Performance from './pages/Report/Performance';
import Editprofile from './pages/Employee/Editprofile';
import Satisfaction from './pages/Employee/Satisfaction';
import App from './App';
import SendSatisfaction from './pages/Employee/SendSatisfaction';
import PrivateRoute from './components/authentication/Redirect/PrivateRoute';
import AdminAuth from './components/authentication/Redirect/AdminAuth';
import FinishedTaskswithSatisfaction from './pages/Employee/FinishedTaskswithSatisfaction';
import NewRequestsForRequester from './pages/Employee/NewRequestsForRequester';
import ProgressTasksForRequester from './pages/Employee/ProgressTasksForRequester';
import AddStandard from './pages/Standard/AddStandard';
import SendStandard from './pages/Standard/SendStandard';
import ITStandard from './pages/Standard/ITStandard';
import StandardList from './pages/Standard/StandardList';
import ListOfStandard from './pages/Standard/ListOfStandard';
import EditSandard from './pages/Standard/EditStandard';
import EditProfileAdmin from './pages/Users/EditProfileAdmin';
import DisplayAnnounce from './pages/Announce/DiplayAnnounce';
import { AnnounceForm } from './components/authentication/Announce';
import AddAnnounce from './pages/Announce/AddAnnounce';
import OfficeUpdate from './pages/Office/OfficeUpdate';

// ----------------------------------------------------------------------

export default function Router() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const [Storage, setstorage] = useState(users);
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        {
          element: <Navigate to="/dashboard/app" replace />
        },
        {
          path: 'app',
          element: <DashboardApp />
        },
        {
          path: 'Office',
          element: <Office />
        },
        { path: 'user', element: <User /> },
        {
          path: 'AllRequest',
          element: <AllRequest />
        },
        { path: 'NewRequest', element: <NewRequest /> },
        { path: 'AssignedRequest', element: <AssignedRequest /> },
        // { path: 'OnProgressRequest', element: <OnProgressRequest /> },
        { path: 'SolutionofferedRequest', element: <SolutionofferedRequest /> },
        { path: 'Performance', element: <Performance /> },
        { path: 'addoffice', element: <AddOffice /> },
        { path: 'register', element: <Register /> },
        { path: 'AddStandard', element: <AddStandard /> },
        { path: 'Standard/:startDate/:endDate', element: <StandardList /> },
        { path: 'StandardUser', element: <StandardList /> },
        { path: 'StandardList', element: <ListOfStandard /> },
        { path: 'UpdateStandard/:Standardid', element: <EditSandard /> },
        { path: 'EditProfile', element: <EditProfileAdmin /> },
        { path: 'Announcement', element: <DisplayAnnounce /> },
        { path: 'AddAnnouncement', element: <AddAnnounce /> },
        { path: 'UpdateOffice/:office_id', element: <OfficeUpdate /> },
        {
          path: 'StandardForm/:requestid',
          element: <SendStandard />
        }
      ]
    },

    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    {
      path: 'login',
      element: <Login />
    },
    {
      path: 'SendRequest',
      element: <SendRequest />
    },
    {
      path: 'EditProfile',
      element: <Editprofile />
    },
    {
      path: 'satisfaction',
      element: <Satisfaction />
    },
    {
      path: 'AddSatisfaction/:request_id',
      element: <SendSatisfaction />
    },
    {
      path: 'finishshedTasksSatisfaction',
      element: <FinishedTaskswithSatisfaction />
    },
    {
      path: 'NewRequestsFor',
      element: <NewRequestsForRequester />
    },
    {
      path: 'ProgressTasksFor',
      element: <ProgressTasksForRequester />
    }
  ]);
}
