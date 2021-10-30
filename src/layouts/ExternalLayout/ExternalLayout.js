import React from 'react';
import { RootContainer } from './ExternalLayout.styles';

const ExternalLayout = ({ children }) => {
  return (
    <RootContainer justify="center" align="middle">
      {children}
    </RootContainer>
  );
};

export default ExternalLayout;
