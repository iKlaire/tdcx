import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { REACT_APP_SENTRY_DSN, REACT_APP_DEPLOY_ENV } from 'config/env';

import { logInfo } from './logging';

let hasInit = false;
const shouldTrack = !!REACT_APP_SENTRY_DSN;

export const init = (withPerf = true) => {
  if (hasInit) {
    logInfo('Sentry has been init');
    return;
  }
  if (!shouldTrack) {
    return;
  }

  const defaultConfig = {
    environment: REACT_APP_DEPLOY_ENV,
    dsn: REACT_APP_SENTRY_DSN,
    ignoreErrors: ['ResizeObserver loop limit exceeded']
  };
  const extraConfig = {};
  if (withPerf) {
    extraConfig.tracesSampleRate = 1.0;
    extraConfig.integrations = [new Integrations.BrowserTracing()];
  }

  Sentry.init({
    ...defaultConfig,
    ...extraConfig
  });

  hasInit = true;
};

export const addUserContext = ({ id, username }) => {
  if (!hasInit) {
    logInfo('Sentry has not been initialize,');
    init();
  }
  if (!shouldTrack) {
    return;
  }

  Sentry.setUser({ id, username });
};

export const removeUserContext = () => {
  if (!hasInit) {
    logInfo('Sentry has not been initialize,');
    init();
  }
  if (!shouldTrack) {
    return;
  }

  Sentry.configureScope(scope => scope.setUser(null));
};
