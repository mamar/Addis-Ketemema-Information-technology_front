// layouts
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import AddAnnounce from './pages/Announce/AddAnnounce';
import DisplayAnnounce from './pages/Announce/DiplayAnnounce';
import DashboardApp from './pages/DashboardApp';
import Editprofile from './pages/Employee/Editprofile';
import FinishedTaskswithSatisfaction from './pages/Employee/FinishedTaskswithSatisfaction';
import NewRequestsForRequester from './pages/Employee/NewRequestsForRequester';
import ProgressTasksForRequester from './pages/Employee/ProgressTasksForRequester';
import Satisfaction from './pages/Employee/Satisfaction';
import SendRequest from './pages/Employee/SendRequest';
import SendSatisfaction from './pages/Employee/SendSatisfaction';
import AddOffice from './pages/Office/AddOffice';
import Office from './pages/Office/office';
import OfficeUpdate from './pages/Office/OfficeUpdate';
import NotFound from './pages/Page404';
import Performance from './pages/Report/Performance';
import AllRequest from './pages/RequestAdmin/AllRequest';
import AssignedRequest from './pages/RequestAdmin/AssignedRequest';
import NewRequest from './pages/RequestAdmin/NewRequst';
// import OnProgressRequest from './pages/OnProgressRequest';
import SolutionofferedRequest from './pages/RequestAdmin/SolutionofferedRequest';
import AddStandard from './pages/Standard/AddStandard';
import EditSandard from './pages/Standard/EditStandard';
import ListOfStandard from './pages/Standard/ListOfStandard';
import SendStandard from './pages/Standard/SendStandard';
import StandardList from './pages/Standard/StandardList';
import EditProfileAdmin from './pages/Users/EditProfileAdmin';
//
import Login from './pages/Users/Login';
import Register from './pages/Users/Register';
import UpdateProfielByid from './pages/Users/UpdateProfielByid';
import User from './pages/Users/User';

// ----------------------------------------------------------------------

export default function Router() {
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
        { path: 'addoffice', element: <AddOffice /> },
        { path: 'UpdateOffice/:office_id', element: <OfficeUpdate /> },
        // users Route
        { path: 'user', element: <User /> },
        { path: 'EditProfile', element: <EditProfileAdmin /> },
        { path: 'register', element: <Register /> },
        { path: 'UserUpdate/:userid', element: <UpdateProfielByid /> },
        // Request Route
        {
          path: 'AllRequest',
          element: <AllRequest />
        },
        { path: 'NewRequest', element: <NewRequest /> },
        { path: 'AssignedRequest', element: <AssignedRequest /> },
        // { path: 'OnProgressRequest', element: <OnProgressRequest /> }
        { path: 'SolutionofferedRequest', element: <SolutionofferedRequest /> },
        { path: 'Performance', element: <Performance /> },
        // Standard Route
        { path: 'AddStandard', element: <AddStandard /> },
        { path: 'Standard/:startDate/:endDate', element: <StandardList /> },
        { path: 'StandardUser', element: <StandardList /> },
        { path: 'StandardList', element: <ListOfStandard /> },
        { path: 'UpdateStandard/:Standardid', element: <EditSandard /> },
        // Anoune Route
        { path: 'Announcement', element: <DisplayAnnounce /> },
        { path: 'AddAnnouncement', element: <AddAnnounce /> },
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
