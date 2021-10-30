import React from 'react';

import { StyledTitle } from './Title.styles.js';

const Title = ({ children, marginBottom }) => {
  return (
    <StyledTitle marginBottom={marginBottom} data-testid="title">
      {children}
    </StyledTitle>
  );
};

export default Title;
