import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PATH_URL } from '../../utils/constants';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  return (
    <Route
      {...rest}
      render={props => (
        !isAuthenticated && !loading ? (
          <Redirect to={PATH_URL.LANDING} />
        ) : (
          <Component {...props} />
        )
      )}
    />
  );
};

export default PrivateRoute;
