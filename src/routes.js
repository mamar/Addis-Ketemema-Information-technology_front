import { Navigate, useRoutes, useNavigate, Route } from 'react-router-dom';
// layouts
import { useState } from 'react';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import AllRequest from './pages/AllRequest';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import NewRequest from './pages/NewRequst';
import AssignedRequest from './pages/AssignedRequest';
// import OnProgressRequest from './pages/OnProgressRequest';
import SolutionofferedRequest from './pages/SolutionofferedRequest';
import Office from './pages/office';
import Officeform from './components/authentication/office/Officeform';
import SendRequest from './pages/SendRequest';
import AddOffice from './pages/AddOffice';
import Performance from './pages/Performance';
import Editprofile from './pages/Editprofile';
import Satisfaction from './pages/Satisfaction';
import App from './App';
import SendSatisfaction from './pages/SendSatisfaction';
import PrivateRoute from './components/authentication/Redirect/PrivateRoute';

// ----------------------------------------------------------------------

export default function Router() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const [Storage, setstorage] = useState(users);
  return useRoutes([
    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      ),
      children: [
        {
          element: (
            <PrivateRoute>
              <Navigate to="/dashboard/app" replace />
            </PrivateRoute>
          )
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
        { path: 'AllRequest', element: <AllRequest /> },
        { path: 'NewRequest', element: <NewRequest /> },
        { path: 'AssignedRequest', element: <AssignedRequest /> },
        // { path: 'OnProgressRequest', element: <OnProgressRequest /> },
        { path: 'SolutionofferedRequest', element: <SolutionofferedRequest /> },
        { path: 'Performance', element: <Performance /> },
        { path: 'addoffice', element: <AddOffice /> }
      ]
    },
    {
      path: '/',
      element: (
        <PrivateRoute>
          <LogoOnlyLayout />
        </PrivateRoute>
      ),
      children: [
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
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
      element: (
        <PrivateRoute>
          <SendRequest />
        </PrivateRoute>
      )
    },
    {
      path: 'EditProfile',
      element: (
        <PrivateRoute>
          <Editprofile />
        </PrivateRoute>
      )
    },
    {
      path: 'satisfaction',
      element: (
        <PrivateRoute>
          <Satisfaction />
        </PrivateRoute>
      )
    },
    {
      path: 'AddSatisfaction/:request_id',
      element: (
        <PrivateRoute>
          <SendSatisfaction />
        </PrivateRoute>
      )
    }
  ]);
}
