import styled from '@emotion/styled';
import { Layout } from 'antd';

const { Header } = Layout;

export const ContentLayout = styled(Layout)`
  height: 100vh;
  background-color: ${props => props.theme.color.baseBgColor};
  border-radius: 24px 0px 0px 24px;
  overflow-y: auto;
`;

export const ContentHeader = styled(Header)`
  background-color: ${props => props.theme.color.white};
  height: 64px;
  color: ${props => props.theme.color.textColor};
  font-size: 16px;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  @media (max-width: 768px) {
    padding: 0 25px;
  }
`;

export const ContentBody = styled.div`
  width: 100%;
  justify-content: center;
  overflow: auto;
  padding: ${props => props.theme.spacing.regular} ${props => props.theme.spacing.md} ${props => props.theme.spacing.md}
    ${props => props.theme.spacing.md};

  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`;
