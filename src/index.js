import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AppContextProvider } from 'contexts/AppContext/AppContext';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import StandardLayout from 'layouts/StandardLayout/StandardLayout';
import ExternalLayout from 'layouts/ExternalLayout/ExternalLayout';

import Login from 'pages/Login/Login';
import Dashboard from 'pages/Dashboard/Dashboard';

import { buildDashboardUri, buildLoginUri } from 'utils/routes';
import { init as initErrAndPerf } from 'utils/errorAndPerfLogging';

import './index.css';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 2 * 1000 // 2 seconds
    }
  }
});
initErrAndPerf();

const loginUri = buildLoginUri();
const dashboardUri = buildDashboardUri();

const pathsInStandardLayout = [dashboardUri];

const pathsInExternalLayout = [loginUri];

const InternalAppSwitch = () => {
  return (
    <StandardLayout>
      <Switch>
        <ProtectedRoute exact path={dashboardUri} component={Dashboard} />
      </Switch>
    </StandardLayout>
  );
};

const ExternalAppSwitch = () => {
  return (
    <ExternalLayout>
      <Switch>
        <Route exact path={loginUri} component={Login} />
      </Switch>
    </ExternalLayout>
  );
};

const Main = () => {
  return (
    <Router>
      <AppContextProvider>
        <Switch>
          <Redirect exact from="/" to={loginUri} />
          <Route path={pathsInStandardLayout}>
            <InternalAppSwitch />
          </Route>
          <Route path={pathsInExternalLayout}>
            <ExternalAppSwitch />
          </Route>
          <Redirect from="*" to={loginUri} />
        </Switch>
      </AppContextProvider>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback="loading">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <Main />
        </QueryClientProvider>
      </HelmetProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

reportWebVitals();
