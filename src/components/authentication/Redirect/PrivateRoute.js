import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const users = JSON.parse(localStorage.getItem('userinfo'));
  return users ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
