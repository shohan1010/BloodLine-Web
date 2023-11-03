import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute_User = ({ component: Component, userRole, allowedRoles, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (userRole && allowedRoles.includes(userRole)) {
          // User has the necessary role to access the route
          return <Component {...props} />;
        } else {
          // User does not have the necessary role, redirect to a different page (or you can customize the redirection path)
          return <Redirect to="/" />;
        }
      }}
    />
  );
};

export default ProtectedRoute_User;
