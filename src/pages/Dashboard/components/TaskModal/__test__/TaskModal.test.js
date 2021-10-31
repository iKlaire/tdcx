import { render, screen, fireEvent } from '@testing-library/react';
import { AppContextProvider } from 'contexts/AppContext/AppContext';

import 'matchMedia.js';
import TaskModal from '../TaskModal';

const MockTaskModal = props => (
  <AppContextProvider>
    <TaskModal {...props} />
  </AppContextProvider>
);

describe('TaskModal Component', () => {
  it('should not render when visible is false', () => {
    const { queryByTestId } = render(<MockTaskModal />);
    const taskModal = queryByTestId('taskModal');

    expect(taskModal).not.toBeInTheDocument();
  });

  it('should render when visible is true', () => {
    const { queryByTestId } = render(<MockTaskModal visible />);
    const taskModal = queryByTestId('taskModal');

    expect(taskModal).toBeInTheDocument();
  });

  // it('should show error message if input is empty when submit button click', () => {
  //   const { getByTestId, getByRole, getByPlaceholderText } = render(<MockTaskModal visible />);
  //   const taskModal = getByTestId('taskModal');
  //   const submitButton = getByRole('button', { name: '+ New Task' });
  //   const textInput = getByPlaceholderText('Task Name');

  //   fireEvent.change(textInput, { target: { value: '' } });
  //   fireEvent.click(submitButton);
  //   screen.debug(taskModal);
  //   expect(taskModal).toHaveTextContent('Please enter the name of the task.');
  // });

  // it('should hide modal when submit button clicked', () => {
  //   const onSubmitted = jest.fn();
  //   const { getByTestId, getByRole, getByPlaceholderText } = render(<MockTaskModal visible onSubmitted={onSubmitted} />);
  //   const taskModal = getByTestId('taskModal');
  //   const taskModalForm = getByTestId('form');
  //   const submitButton = getByRole('button', { name: '+ New Task' });
  //   const textInput = getByPlaceholderText('Task Name');

  //   fireEvent.change(textInput, { target: { value: 'Hello' } });
  //   fireEvent.submit(taskModalForm);
  //   screen.debug(taskModal);
  //   expect(onSubmitted).toHaveBeenCalled();
  // });
});
