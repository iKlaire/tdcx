import PropTypes from 'prop-types';

import Skeleton from 'components/Skeleton/Skeleton';
import Title from 'components/Title/Title';

import { StyledCard } from './Card.styles';

const Card = ({ children, isLoading, title, style }) => {
  return (
    <StyledCard bodyStyle={style} data-testid="card">
      {isLoading ? (
        <Skeleton active />
      ) : (
        <>
          {title && <Title>{title}</Title>}
          {children}
        </>
      )}
    </StyledCard>
  );
};

Card.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string
};

Card.defaultProps = {
  isLoading: false,
  title: ''
};

export default Card;
