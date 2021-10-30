import { Skeleton } from 'antd';

import Title from 'components/Title/Title';

import { StyledCard } from './Card.styles';

const Card = ({ children, isLoading, title, style }) => {
  return (
    <StyledCard bodyStyle={style} data-testid="card">
      {isLoading ? (
        <Skeleton data-testid="skeleton" />
      ) : (
        <>
          {title && <Title data-testid="title">{title}</Title>}
          {children}
        </>
      )}
    </StyledCard>
  );
};

export default Card;
