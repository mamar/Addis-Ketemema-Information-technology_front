import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';

const AdminAuth = ({ children }) => {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const Admin = () => {
    if (users.user[0].ROLES === 'Admin' || users.user[0].ROLES === 'IT') {
      return true;
    }
  };
  return Admin ? children : <Navigate to="/Satisfaction" />;
};
export default AdminAuth;
