import React from 'react';
import PropTypes from 'prop-types';

import FormLabel from 'components/FormLabel/FormLabel';

import { StyledFormItem } from './FormItem.styles';

const addRules = (requiredErrorMessage, extraRules) => {
  const rules = [];

  if (!!requiredErrorMessage) {
    rules.push({
      required: true,
      message: requiredErrorMessage
    });
  }

  return [...rules, ...extraRules];
};

const FormItem = ({ name, label, requiredErrorMessage, extraRules, noStyle, children, defaultValue, ...props }) => {
  const rules = addRules(requiredErrorMessage, extraRules);

  return (
    <>
      {!!label && (
        <FormLabel hasRequiredErrorMessage={!!requiredErrorMessage} data-testid="label">
          {label}
        </FormLabel>
      )}
      <StyledFormItem name={name} colon={false} rules={rules} initialValue={defaultValue} noStyle={noStyle} {...props} data-testid="formItem">
        {children}
      </StyledFormItem>
    </>
  );
};

FormItem.propTypes = {
  children: PropTypes.node.isRequired,
  name: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  defaultValue: PropTypes.any,
  extraRules: PropTypes.array,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  requiredErrorMessage: PropTypes.string
};

FormItem.defaultProps = {
  label: '',
  requiredErrorMessage: '',
  extraRules: []
};

export default FormItem;
