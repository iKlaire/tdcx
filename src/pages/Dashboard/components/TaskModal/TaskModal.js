import React, { useEffect } from 'react';
import { Form, message, Modal } from 'antd';

import FormInput from 'components/FormInput/FormInput';
import Title from 'components/Title/Title';

import { createTask, updateTask } from 'apis/task';

import { SubmitButton } from './TaskModal.styles.js';
import './TaskModal.css';

const { useForm } = Form;

const TaskModal = ({ defaultValue, visible, onClose, onSubmitted }) => {
  const [form] = useForm();

  const isNew = !defaultValue;
  const text = isNew ? '+ New Task' : 'Update Task';

  useEffect(() => {
    if (defaultValue && Object.keys(defaultValue).length > 0) {
      form.setFieldsValue(defaultValue);
    }
  }, [form, defaultValue]);

  const handleOnFormFinish = payload => {
    if (isNew) {
      createTask(payload)
        .then(() => onSubmitted())
        .catch(ex => message.error(ex));
    } else {
      updateTask(defaultValue._id, payload)
        .then(() => onSubmitted())
        .catch(ex => message.error(ex));
    }
  };

  return (
    <Modal visible={visible} footer={null} width={300} onCancel={onClose} destroyOnClose data-testid="taskModal">
      <Form form={form} initialValues={defaultValue} onFinish={handleOnFormFinish} preserve={false} data-testid="form">
        <Title marginBottom="12px">{text}</Title>
        <FormInput name="name" placeholder="Task Name" requiredErrorMessage="Please enter the name of the task." />
        <SubmitButton type="primary" htmlType="submit">
          {text}
        </SubmitButton>
      </Form>
    </Modal>
  );
};

export default TaskModal;
