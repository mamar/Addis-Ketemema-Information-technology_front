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
import { AddSatisfaction } from './components/authentication/Request';
// ----------------------------------------------------------------------

export default function Router() {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const [Storage, setstorage] = useState(users);

  const privateRoute = (children) => (Storage ? children : <Navigate to="/login" />);

  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        {
          path: 'app',
          element: (
            <privateRoute>
              <DashboardApp />
            </privateRoute>
          )
        },
        {
          path: 'Office',
          element: (
            <privateRoute>
              <Office />
            </privateRoute>
          )
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
      element: <LogoOnlyLayout />,
      children: [
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: 'login', element: <Login /> },
    { path: 'SendRequest', element: <SendRequest /> },
    { path: 'EditProfile', element: <Editprofile /> },
    { path: 'satisfaction', element: <Satisfaction /> },
    { path: 'AddSatisfaction', element: <AddSatisfaction /> }
  ]);
}
