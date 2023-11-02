import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../Page/Login';

const ProtectedRoute = ({ path, component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      path={path}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} {...rest} />
        ) : (
          <Login/>
        )
      }
    />
  );
};

export default ProtectedRoute;