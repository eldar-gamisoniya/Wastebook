import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'ramda';

import CheckboxGroup from 'shared/CheckboxGroup';
import Step from './Step';
import { getCurrentStep } from '../selectors';

const step1Options = [
  { label: 'A1', value: 'A1' },
  { label: 'A2', value: 'A2' },
];

const StepManager = ({ currentStep }) =>
  <form>
    <Step>
      <CheckboxGroup name="step1" options={step1Options} />
    </Step>
    {currentStep > 1 ? 'I will be displaying all the steps' : ''}
  </form>;

StepManager.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default compose(
  reduxForm({
    form: 'steps',
  }),
  connect(state => ({
    currentStep: getCurrentStep(state),
  })),
)(StepManager);
