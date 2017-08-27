import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import withStep from 'modules/step';
import CheckboxGroup from 'shared/CheckboxGroup';
import Step from './Step';
import { callIfChanged } from '../utils';

const step1Options = [
  { label: 'A1', value: 'A1' },
  { label: 'A2', value: 'A2' },
];

const isValid = value => value && value.length > 0;

const validate = value =>
  !isValid(value) ? 'Should be at least 1' : undefined;

const StepComponent = ({ onStepPassed, onStepFailed }) =>
  <Step>
    <Field
      name="a"
      validate={validate}
      options={step1Options}
      component={CheckboxGroup}
      onChange={(event, newValue, previousValue) =>
        callIfChanged(
          isValid,
          newValue,
          previousValue,
          onStepPassed,
          onStepFailed,
        )}
    />
  </Step>;

StepComponent.propTypes = {
  onStepPassed: PropTypes.func.isRequired,
  onStepFailed: PropTypes.func.isRequired,
};

export default withStep('challenge', 0, { showIfPassed: true })(StepComponent);
