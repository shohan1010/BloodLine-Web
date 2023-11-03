import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute_Admin({ component: Component, userRole, allowedRoles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        allowedRoles.includes(userRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Admin_login" />
        )
      }
    />
  );
}

export default ProtectedRoute_Admin;
