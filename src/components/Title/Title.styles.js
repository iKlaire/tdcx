import styled from '@emotion/styled';

export const StyledTitle = styled.div`
  color: ${props => props.theme.color.textColor};
  font-size: 20px;
  margin-bottom: ${props => props.marginBottom || 0};

  &:hover {
    cursor: default;
  }
`;
