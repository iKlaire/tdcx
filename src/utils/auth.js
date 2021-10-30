const getAuthObj = () => {
  const authFromLocalStorage = window.localStorage.getItem('auth');
  if (authFromLocalStorage) {
    return JSON.parse(authFromLocalStorage);
  }
  return {};
};

export const getIsUserLoggedIn = () => {
  const authObj = getAuthObj();
  return Object.keys(authObj).length > 0;
};

export const getUser = () => {
  const authObj = getAuthObj();
  return authObj.user || {};
};

export const getAuthToken = () => {
  const authObj = getAuthObj();
  return authObj.token || '';
};

export const setUserAuthObj = userAuthObj => {
  window.localStorage.setItem('auth', JSON.stringify(userAuthObj));
};

export const deleteUserAuthObj = () => {
  window.localStorage.removeItem('auth');
};
