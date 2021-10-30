import { render } from '@testing-library/react';
import { AppContextProvider } from 'contexts/AppContext/AppContext';
import RequiredAsterisk from '../RequiredAsterisk';

describe('RequiredAsterisk Component', () => {
  it('rendered required asterisk', () => {
    const { getByTestId } = render(
      <AppContextProvider>
        <RequiredAsterisk />
      </AppContextProvider>
    );
    const asterisk = getByTestId('asterisk');

    expect(asterisk).toHaveTextContent('*');
  });
});
