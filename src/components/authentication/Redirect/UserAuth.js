import React from 'react';
import { Navigate } from 'react-router-dom';

const UserAuth = ({ children }) => {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  const userau = () => {
    if (users.user[0].ROLES === 'Employee') {
      return true;
    }
  };
  return userau ? children : <Navigate to="/dashboard" />;
};
export default UserAuth;
