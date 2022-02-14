import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const [userinfo, setuseronfo] = useState(localStorage.getItem('userinfo'));
  return userinfo ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
