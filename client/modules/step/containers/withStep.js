import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { wrapDisplayName } from 'recompose';

import { getCurrentStep } from '../selectors';
import * as actions from '../actions';

const withStep = (
  sequence,
  step,
  { showIfPassed = false } = {},
) => WrappedComponent => {
  const Step = ({
    currentStep,
    nextStep,
    previousStep,
    stepFailed,
    ...otherProps
  }) => {
    if (
      (!showIfPassed && step !== currentStep) ||
      (showIfPassed && step > currentStep)
    )
      return null;

    return (
      <WrappedComponent
        currentStep={currentStep}
        onStepPassed={nextStep}
        onStepFailed={stepFailed}
        onStepReturned={previousStep}
        {...otherProps}
      />
    );
  };
  Step.propTypes = {
    currentStep: PropTypes.number.isRequired,
    nextStep: PropTypes.func.isRequired,
    previousStep: PropTypes.func.isRequired,
    stepFailed: PropTypes.func.isRequired,
  };

  Step.displayName = wrapDisplayName(WrappedComponent, 'withStep');

  return connect(
    state => ({ currentStep: getCurrentStep(state, sequence) }),
    dispatch => ({
      nextStep: () => dispatch(actions.nextStep(sequence)),
      previousStep: () => dispatch(actions.previousStep(sequence)),
      stepFailed: () => dispatch(actions.stepFailed(sequence, step)),
    }),
  )(Step);
};
export default withStep;
