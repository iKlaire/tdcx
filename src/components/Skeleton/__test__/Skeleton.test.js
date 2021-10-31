import { render, screen } from '@testing-library/react';

import Skeleton from '../Skeleton';

describe('Skeleton Component', () => {
  it('should render', () => {
    const { queryByTestId } = render(<Skeleton />);
    const skeleton = queryByTestId('skeleton');

    expect(skeleton).toBeInTheDocument();
  });

  it('should not render skeleton when loading is false', () => {
    const { queryByTestId } = render(<Skeleton loading={false} />);
    const skeleton = queryByTestId('skeleton');

    expect(skeleton).not.toBeInTheDocument();
  });
});
