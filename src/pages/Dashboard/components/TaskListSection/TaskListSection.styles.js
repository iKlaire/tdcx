import styled from '@emotion/styled';
import { Button, Input, List, Row } from 'antd';

export const AddTaskButton = styled(Button)`
  width: 100%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const HeaderRow = styled(Row)`
margin
  justify: space-between;
  ${'' /* margin-bottom: ${props => props.theme.spacing.s}; */}

  @media (max-width: 767px) {
    text-align: center;
  }
`;

export const ItemTitleText = styled.span`
  font-size: 20px;
  color: ${props => (props.isCompleted ? props.theme.color.textColor : props.theme.color.primary)};
  text-decoration: ${props => props.isCompleted && 'line-through'};
  margin-bottom: 0;
`;

export const ListItemMeta = styled(List.Item.Meta)`
  align-items: center;
`;

export const SearchInput = styled(Input)`
  width: 100%;
  @media (max-width: 768px) {
    width: 90%;
  }
`;
