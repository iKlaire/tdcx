import { render } from '@testing-library/react';
import { AppContextProvider } from 'contexts/AppContext/AppContext';
import Title from '../Title';

const MockTitle = ({ children }) => (
  <AppContextProvider>
    <Title>{children}</Title>
  </AppContextProvider>
);

describe('Title Component', () => {
  it('should render text correctly', () => {
    const { getByText } = render(<MockTitle>My Title</MockTitle>);
    const title = getByText('My Title');

    expect(title).toBeInTheDocument();
  });
});
