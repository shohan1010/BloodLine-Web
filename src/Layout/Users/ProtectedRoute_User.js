import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute_User({ component: Component, userRole, allowedRoles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        allowedRoles.includes(userRole) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/Login" />
        )
      }
    />
  );
}

export default ProtectedRoute_User;
