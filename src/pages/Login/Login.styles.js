import styled from '@emotion/styled';

export const LoginContainer = styled.div`
  background-color: ${props => props.theme.color.white};
  border-radius: 8px;
  margin: 0 auto ${props => props.theme.spacing.s} auto;
  padding: ${props => props.theme.spacing.md};
  width: 300px;
`;
