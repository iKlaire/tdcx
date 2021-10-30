module.exports = {
  REACT_APP_API_ENDPOINT: process.env.REACT_APP_API_ENDPOINT || 'https://dev-dl.tdcx.com:3092',
  REACT_APP_SENTRY_DSN: 'https://61a165446204426aabbebbaebc0cad9e@o1054797.ingest.sentry.io/6040441',
  REACT_APP_DEPLOY_ENV: process.env.REACT_APP_DEPLOY_ENV || 'dev',

  IS_DEV: !process.env.REACT_APP_DEPLOY_ENV || process.env.REACT_APP_DEPLOY_ENV === 'dev',
  PORT: process.env.PORT || '5001'
};
