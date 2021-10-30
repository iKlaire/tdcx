import styled from '@emotion/styled';
import { Button } from 'antd';

const BUTTON_COLOR = {
  danger: 'red',
  highlight: 'secondary',
  success: 'green',
  default: 'textColor'
};

export const StyledButton = styled(Button)`
  color: ${props => props.theme && props.theme.color && props.theme.color[BUTTON_COLOR[props.color]]};
  font-size: 16px;
`;
