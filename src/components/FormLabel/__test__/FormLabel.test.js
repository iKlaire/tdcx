import { render } from '@testing-library/react';
import { AppContextProvider } from 'contexts/AppContext/AppContext';
import FormLabel from '../FormLabel';

describe('FormLabel Component', () => {
  it('rendered form label', () => {
    const { getByTestId } = render(
      <AppContextProvider>
        <FormLabel>Testing</FormLabel>
      </AppContextProvider>
    );
    const formlabel = getByTestId('formlabel');

    expect(formlabel).toHaveTextContent('Testing');
  });

  it('rendered form label w/ required asterisk', () => {
    const { getByTestId } = render(
      <AppContextProvider>
        <FormLabel hasRequiredErrorMessage="Required">Testing</FormLabel>
      </AppContextProvider>
    );
    const asterisk = getByTestId('asterisk');

    expect(asterisk).toBeInTheDocument();
  });
});
