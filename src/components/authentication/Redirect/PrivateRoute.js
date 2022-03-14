import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'Admin' || users.user[0].ROLES === 'IT') {
      return <Navigate to="/dashboard/app" />;
    }
    return <Navigate to={children} />;
  }
};
export default PrivateRoute;
