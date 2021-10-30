import styled from '@emotion/styled';

export const DashboardContainer = styled.div`
  border-radius: 8px;
  width: 80vw;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100vw;
    margin: 0;
  }
`;

export const CompletedTaskText = styled.span`
  font-size: 64px;
  color: ${props => props.theme.color.primary};
`;

export const TotalTaskText = styled.span`
  font-size: 24px;
  color: #758c91;
`;

export const List = styled.ul`
  padding-left: 20px;
  color: ${props => props.theme.color.textColor};
`;

export const ListItem = styled.li`
  color: ${props => props.theme.color.textColor};
  font-size: 16px;
  text-decoration: ${props => props.isCompleted && 'line-through'};
`;
