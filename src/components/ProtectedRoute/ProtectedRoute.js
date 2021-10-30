import React from 'react';
import { message, Skeleton } from 'antd';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import { withAppContext } from 'contexts/AppContext/AppContext';
import { buildLoginUri } from 'utils/routes';

const loginUri = buildLoginUri();

const ProtectedRoute = ({ isLoggedIn, isUserLoading, component, path, ...otherRouteProps }) => {
  if (isUserLoading) {
    return <Skeleton loading={isUserLoading} />;
  } else if (!isLoggedIn) {
    message.error('Please login before accessing this page');
    return <Redirect to={loginUri} />;
  } else {
    return <Route path={path} component={component} {...otherRouteProps} />;
  }
};

ProtectedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isUserLoading: PropTypes.bool.isRequired
};

export default withAppContext(ProtectedRoute);
