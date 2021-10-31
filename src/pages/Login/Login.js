import { useState } from 'react';
import { Button, Form, message } from 'antd';
import { useHistory } from 'react-router-dom';

import FormInput from 'components/FormInput/FormInput';
import { withAppContext } from 'contexts/AppContext/AppContext';
import { buildDashboardUri } from 'utils/routes';

import Title from 'components/Title/Title';

import { LoginContainer } from './Login.styles';

const { useForm } = Form;

const Login = ({ onLogin }) => {
  const [form] = useForm();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const handleOnLogin = async values => {
    setIsLoading(true);

    return onLogin(values)
      .then(() => {
        message.success(`Login Success`);
        history.push(buildDashboardUri());
      })
      .catch(ex => {
        message.error(`Login failed: ${ex}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <LoginContainer data-testid="login">
      <Form form={form} onFinish={handleOnLogin}>
        <Title marginBottom={12}>Login</Title>
        <FormInput name="apiKey" type="password" placeholder="Id" requiredErrorMessage="Id is required to login." />
        <FormInput name="name" placeholder="Name" requiredErrorMessage="Name is required to login" />
        <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100%', height: '38px' }}>
          Login
        </Button>
      </Form>
    </LoginContainer>
  );
};

export default withAppContext(Login);
