import { render } from '@testing-library/react';
import { AppContextProvider } from 'contexts/AppContext/AppContext';

import 'matchMedia.js';
import Login from '../Login';

const MockLogin = () => (
  <AppContextProvider>
    <Login />
  </AppContextProvider>
);

describe('Login Component', () => {
  it('should render', () => {
    const { getByTestId } = render(<MockLogin />);
    const login = getByTestId('login');

    expect(login).toBeInTheDocument();
  });
});
