import axios from 'axios';
import env from 'config/env';
import { getIsUserLoggedIn, getAuthToken } from 'utils/auth';

const FIELDS_SEPERATOR = ',';
const AXIOS_GENERIC_NETWORK_ERROR_MSG = 'Network Error';

export const getAuthHeader = () => {
  if (getIsUserLoggedIn()) {
    return {
      Authorization: getAuthToken()
    };
  }
  return {};
};

export const updateApiHeaders = () => {
  api.defaults.headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader()
  };
};

const api = axios.create({
  baseURL: env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    ...getAuthHeader()
  }
});

// TODO: Might need apiErrorHandlerWithRedirect but since we have react-query we might do that there
const apiErrorHandler = e => {
  if (e.response) {
    throw e.response;
  } else if (e.message) {
    if (e.message === AXIOS_GENERIC_NETWORK_ERROR_MSG) {
      e.message = `${e.message}. Please check your internet connection.`;
    }
    throw e;
  } else {
    throw new Error('Unexpected error occured when calling api. Please contact admin.');
  }
};

const constructAndMutateOptions = params => {
  // fields
  if (!!params && !!params.fields) {
    params._fields = params.fields;
    delete params.fields;
  }
};

const mutateParamsArrayToString = params => {
  if (!!params) {
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const valueInString = value.join(FIELDS_SEPERATOR);
        params[key] = valueInString;
      }
    });
  }
};

api.interceptors.request.use(req => {
  constructAndMutateOptions(req.params);
  mutateParamsArrayToString(req.params);
  return req;
});
api.interceptors.response.use(res => res.data, apiErrorHandler);

export default api;

export const nonAuthApi = axios.create({
  baseURL: env.REACT_APP_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

nonAuthApi.interceptors.response.use(res => res.data, apiErrorHandler);
