import React from 'react';
import { Alert } from '../../common/UIComponents';
import { I18n } from '../../common/Common';

const Errors = (errors) => {
  return (
    <div>
      { errors.map((err) => {
        return (
          <div>{err}</div>
        );
      })}
    </div>
  );
}

const FormErrors = (errors) => {
  const formErrors = errors || [];
  if (formErrors.length < 1) return null;
  return (
    <Alert
      style={{ marginBottom: 15, marginTop: 15 }}
      message={I18n.t('errors.errors')}
      description={Errors(formErrors)}
      type='error'
    />
  );
};

export default FormErrors;
