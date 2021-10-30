import { StyledButton } from './TextButton.styles';

const TextButton = ({ color = 'default', disabled, icon, onClick, text, htmlType }) => {
  return (
    <StyledButton color={color} icon={icon} onClick={onClick} type="link" disabled={disabled} htmlType={htmlType} data-testid="textButton">
      {text}
    </StyledButton>
  );
};

export default TextButton;
