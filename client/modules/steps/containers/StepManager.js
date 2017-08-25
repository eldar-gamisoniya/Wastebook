import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { compose } from 'ramda';

import Step1 from './Step1';
import Step2 from './Step2';
import { getCurrentStep } from '../selectors';
import * as actions from '../actions';

const validate = (values, { stepValidated, stepFailed, currentStep }) => {
  if (currentStep >= 1 && (!values.a || !values.a.length)) {
    stepFailed(1);
    return { a: 'Should be at least 1' };
  }
  if (currentStep >= 2 && !values.b) {
    stepFailed(2);
    return { b: 'Should be set' };
  }
  stepValidated(currentStep);
  return {};
};

export const StepManager = ({ currentStep, handleSubmit }) =>
  <form onSubmit={handleSubmit}>
    {currentStep >= 1 && <Step1 />}
    {currentStep >= 2 && <Step2 />}
  </form>;

StepManager.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default compose(
  connect(
    state => ({
      currentStep: getCurrentStep(state),
    }),
    dispatch => bindActionCreators(actions, dispatch),
  ),
  reduxForm({ form: 'steps', validate }),
)(StepManager);
