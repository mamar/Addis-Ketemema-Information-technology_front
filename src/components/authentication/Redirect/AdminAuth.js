import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';

const AdminAuth = ({ children }) => {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  if (!users) {
    return <Navigate to="/login" />;
  }
  if (users) {
    if (users.user[0].ROLES === 'Employee') {
      return <Navigate to="/satisfaction" />;
    }
    return <Navigate to={children} />;
  }
};
export default AdminAuth;
