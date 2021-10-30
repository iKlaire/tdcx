import styled from '@emotion/styled';
import { Card } from 'antd';

export const StyledCard = styled(Card)`
  height: 100%;
  min-height: 180px;

  @media (max-width: 768px) {
    min-height: 200px;
    width: 100vw;
  }
`;
