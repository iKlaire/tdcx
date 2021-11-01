import { useMemo, useState, useEffect, useCallback, createContext } from 'react';
import { message } from 'antd';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { useHistory } from 'react-router';

import { postLogin } from 'apis/auth';
import { updateApiHeaders } from 'apis/apiHelper';

import { buildDashboardUri, buildLoginUri } from 'utils/routes';
import { getIsUserLoggedIn, getUser, getAuthToken, setUserAuthObj, deleteUserAuthObj } from 'utils/auth';
import { addUserContext as addErrAndPerfUserContext, removeUserContext as removeErrAndPerfUserContext } from 'utils/errorAndPerfLogging';

const AppContext = createContext();

const useTheme = () => {
  const originalTheme = useMemo(
    () => ({
      color: {
        primary: '#5285ec',
        secondary: '#e8ecec',
        tertiary: '#FFFFFF',
        grey: '#797979',
        lightGrey: '#FAFAFA',
        green: '#52C41A',
        red: '#F5222D',
        white: '#FFFFFF',
        borderColor: '#E9E9E9',
        baseBgColor: '#F4F4F6',
        textColor: '#527278'
      },
      fontWeight: {
        light: 200,
        regular: 400,
        bold: 600,
        bolder: 700
      },
      spacing: {
        xxs: '4px',
        xs: '8px',
        s: '12px',
        regular: '16px',
        md: '32px',
        lg: '40px',
        xl: '48px',
        xxl: '60px',
        xxxl: '104px'
      }
    }),
    []
  );
  const [theme] = useState(originalTheme);

  return theme;
};

export const AppContextProvider = ({ children }) => {
  const history = useHistory();
  const theme = useTheme();

  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  const isLoggedIn = !!user && !!user.name;

  const onLogin = ({ apiKey, name }) => {
    return postLogin(apiKey, name).then(res => {
      const userData = {
        token: res.token.token,
        user: {
          id: apiKey,
          name: res.token.name,
          image: res.image
        }
      };
      setUserAuthObj(userData);
      updateApiHeaders(); // update API header ASAP to ensure subsequent API call is updated
      setUser(userData.user);
      addErrAndPerfUserContext({ id: apiKey, username: name });
      return userData;
    });
  };

  const onLogout = useCallback(() => {
    deleteUserAuthObj();
    setUser({});
    updateApiHeaders();
    history.push(buildLoginUri());

    removeErrAndPerfUserContext();
  }, [history]);

  const mountUserData = useCallback(async () => {
    if (getIsUserLoggedIn()) {
      const storedToken = getAuthToken();
      const storedUser = getUser();
      setUser(storedUser);
      setToken(storedToken);
      history.push(buildDashboardUri());

      addErrAndPerfUserContext({ id: storedUser.id, username: storedUser.name });
    } else {
      onLogout();
      message.error('Your session has expired. Please log in again.');
      history.push(buildLoginUri());
    }
    setIsLoadingUser(false);
  }, [history, onLogout]);

  useEffect(() => {
    mountUserData();
  }, [mountUserData]);

  return (
    <AppContext.Provider
      value={{
        user,
        token,
        onLogin,
        onLogout,
        isLoggedIn,
        isUserLoading: isLoadingUser
      }}
    >
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </AppContext.Provider>
  );
};

export const AppContextConsumer = AppContext.Consumer;

export const withAppContext = Component => {
  const AppContextComponent = props => <AppContextConsumer>{appContextProps => <Component {...appContextProps} {...props} />}</AppContextConsumer>;
  return AppContextComponent;
};
