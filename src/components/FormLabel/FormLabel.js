import React from 'react';

import RequiredAsterisk from 'components/RequiredAsterisk/RequiredAsterisk';

import { Root } from './FormLabel.styles';

const FormLabel = ({ children, hasRequiredErrorMessage, ...props }) => (
  <Root {...props} data-testid="formlabel">
    {hasRequiredErrorMessage ? <RequiredAsterisk data-testid="asterisk" /> : ''}
    {children}
  </Root>
);

FormLabel.defaultProps = {
  hasRequiredErrorMessage: false
};

export default FormLabel;
