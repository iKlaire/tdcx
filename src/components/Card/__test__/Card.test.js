import { render } from '@testing-library/react';
import { AppContextProvider } from 'contexts/AppContext/AppContext';
import Card from '../Card';

const MockCard = ({ children, isLoading, title }) => (
  <AppContextProvider>
    <Card isLoading={isLoading} title={title}>
      {children}
    </Card>
  </AppContextProvider>
);

describe('Card Component', () => {
  it('should render', () => {
    const { getByTestId } = render(<MockCard />);
    const card = getByTestId('card');

    expect(card).toBeInTheDocument();
  });

  it('should render w/ title', () => {
    const { getByText } = render(<MockCard title="Title" />);
    const titleInCard = getByText('Title');

    expect(titleInCard).toBeInTheDocument();
  });

  it('should render w/ skeleton when loading', () => {
    const { queryByTestId } = render(<MockCard isLoading={true} title="Title" />);
    const skeleton = queryByTestId('skeleton');

    expect(skeleton).toBeInTheDocument();
  });

  it('should render w/o title when loading', () => {
    const { queryByText } = render(<MockCard isLoading={true} title="Title" />);
    const title = queryByText('Title');

    expect(title).not.toBeInTheDocument();
  });

  it('should render w/o skeleton when not loading', () => {
    const { queryByTestId } = render(<MockCard isLoading={false} />);
    const skeleton = queryByTestId('skeleton');

    expect(skeleton).not.toBeInTheDocument();
  });
});
