import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, SubmissionError } from 'redux-form';

import { submitIt } from 'api/api';
import { FORM_NAME } from '../constants';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

const validate = values => {
  const errors = {};
  if (!values.c) {
    errors.c = 'Should be choosen';
  }
  return errors;
};

export const StepManagerComponent = ({ handleSubmit, error }) =>
  <form onSubmit={handleSubmit}>
    <Step1 />
    <Step2 />
    <Step3 />
    <Step4 />
    <Step5 />
    {error}
  </form>;

StepManagerComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};
StepManagerComponent.defaultProps = {
  error: null,
};

export default reduxForm({
  form: FORM_NAME,
  validate,
  onSubmit: async values => {
    try {
      await submitIt(values);
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
  },
})(StepManagerComponent);
