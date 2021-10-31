import { render } from '@testing-library/react';
import { AppContextProvider } from 'contexts/AppContext/AppContext';
import TextButton from '../TextButton';

const MockTextButton = ({ text }) => (
  <AppContextProvider>
    <TextButton text={text} />
  </AppContextProvider>
);

describe('TextButton Component', () => {
  it('rendered text button', () => {
    const { getByTestId } = render(<TextButton />);
    const textButton = getByTestId('textButton');

    expect(textButton).toBeTruthy();
  });

  it('render with text', () => {
    const { queryByTestId } = render(<MockTextButton text="Back to Home Page" />);
    const textButton = queryByTestId('textButton');

    expect(textButton).toHaveTextContent('Back to Home Page');
  });
});
