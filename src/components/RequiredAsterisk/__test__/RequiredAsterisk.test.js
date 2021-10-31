import { render } from '@testing-library/react';
import { AppContextProvider } from 'contexts/AppContext/AppContext';
import RequiredAsterisk from '../RequiredAsterisk';

const MockRequiredAsterisk = () => {
  return (
    <AppContextProvider>
      <RequiredAsterisk />
    </AppContextProvider>
  );
};

describe('RequiredAsterisk Component', () => {
  it('rendered required asterisk', () => {
    const { getByTestId } = render(<MockRequiredAsterisk />);
    const asterisk = getByTestId('asterisk');

    expect(asterisk).toHaveTextContent('*');
  });
});
