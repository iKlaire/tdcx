import { render } from '@testing-library/react';
import { AppContextProvider } from 'contexts/AppContext/AppContext';
import Card from '../Card';

describe('Card Component', () => {
  it('rendered card', () => {
    const { getByTestId } = render(<Card />);
    const card = getByTestId('card');

    expect(card).toBeTruthy();
  });

  it('render with title', () => {
    const { queryByTestId } = render(
      <AppContextProvider>
        <Card isLoading={false} title="Title" />
      </AppContextProvider>
    );
    const title = queryByTestId('title');

    expect(title).toBeTruthy();
  });
});
