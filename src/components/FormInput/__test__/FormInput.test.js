import { render, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

import { AppContextProvider } from 'contexts/AppContext/AppContext';
import 'matchMedia.js';
import FormInput from '../FormInput';

const MockFormInput = props => {
  return (
    <AppContextProvider>
      <Form>
        <FormInput {...props} />
      </Form>
    </AppContextProvider>
  );
};

describe('FormInput Component', () => {
  it('should fail render w/o name', () => {
    const { queryByRole } = render(<MockFormInput />);
    const input = queryByRole('input');

    expect(input).toBeFalsy();
  });

  it('should render w/ name and label', () => {
    const { queryByPlaceholderText, queryByText } = render(<MockFormInput name="newField" label="New Field" placeholder="Please enter" />);
    const input = queryByPlaceholderText('Please enter');
    const label = queryByText('New Field');

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('should be able to type in input', () => {
    const { queryByPlaceholderText } = render(<MockFormInput name="newField" placeholder="Please enter" />);
    const input = queryByPlaceholderText('Please enter');
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(input.value).toBe('Hello');
  });
});
