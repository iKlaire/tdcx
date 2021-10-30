import { render } from '@testing-library/react';
import { AppContextProvider } from 'contexts/AppContext/AppContext';
import Title from '../Title';

describe('Title Component', () => {
  it('rendered title', () => {
    const { getByTestId } = render(
      <AppContextProvider>
        <Title />
      </AppContextProvider>
    );
    const title = getByTestId('title');

    expect(title).toBeTruthy();
  });
});
