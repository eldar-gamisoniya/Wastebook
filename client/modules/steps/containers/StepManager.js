import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, SubmissionError } from 'redux-form';
import { compose } from 'ramda';

import { checkIt, submitIt } from 'api/api';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
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
  if (currentStep === 3) {
    return {};
  }
  if (currentStep >= 4 && !values.c) {
    stepFailed(4);
    return { c: 'Choose any option' };
  }
  if (currentStep >= 5) {
    return {};
  }
  stepValidated(currentStep);
  return {};
};

const asyncValidation = async (
  values,
  dispatch,
  { stepValidated, stepFailed, currentStep },
) => {
  try {
    await checkIt(values.text);
    if (currentStep === 3) stepValidated(3);
  } catch (e) {
    stepFailed(3);
    throw { text: e.message };
  }
};

export const StepManager = ({
  currentStep,
  handleSubmit,
  asyncValidate,
  error,
}) =>
  <form onSubmit={handleSubmit}>
    {currentStep >= 1 && <Step1 />}
    {currentStep >= 2 && <Step2 />}
    {currentStep >= 3 && <Step3 onClickHandler={() => asyncValidate()} />}
    {currentStep >= 4 && <Step4 />}
    {currentStep >= 5 && <Step5 />}
    {error}
  </form>;

StepManager.propTypes = {
  currentStep: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  asyncValidate: PropTypes.func.isRequired,
};

export default compose(
  connect(
    state => ({
      currentStep: getCurrentStep(state),
    }),
    dispatch => bindActionCreators(actions, dispatch),
  ),
  reduxForm({
    form: 'steps',
    validate,
    asyncValidate: asyncValidation,
    asyncBlurFields: ['text'],
    shouldAsyncValidate: ({ trigger }) => trigger === 'submit',
    onSubmit: async values => {
      try {
        await submitIt(values);
      } catch (e) {
        console.log(e);
        throw new SubmissionError({ _error: e.message });
      }
    },
  }),
)(StepManager);
