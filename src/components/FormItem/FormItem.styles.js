import styled from '@emotion/styled';
import { Form } from 'antd';

export const StyledFormItem = styled(Form.Item)`
  width: 100%;
  font-size: 14px;
  margin-bottom: ${props => props.theme.spacing.s};
`;
