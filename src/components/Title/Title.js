import React from 'react';

import { StyledTitle } from './Title.styles.js';

const Title = ({ children, marginBottom }) => {
  return <StyledTitle marginBottom={marginBottom}>{children}</StyledTitle>;
};

export default Title;
