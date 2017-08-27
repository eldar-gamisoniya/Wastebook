import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { compose, withHandlers } from 'recompose';

import withStep from 'modules/step';
import CheckboxGroup from 'shared/CheckboxGroup';
import Step from './Step';
import { callIfChanged } from '../utils';
import { FORM_NAME } from '../constants';

const step1Options = [
  { label: 'A1', value: 'A1' },
  { label: 'A2', value: 'A2' },
];

const isValid = value => value && value.length > 0;

const validate = value =>
  !isValid(value) ? 'Should be at least 1' : undefined;

const StepComponent = ({ onChange }) =>
  <Step>
    <Field
      name="a"
      validate={validate}
      options={step1Options}
      component={CheckboxGroup}
      onChange={onChange}
    />
  </Step>;

StepComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default compose(
  withStep(FORM_NAME, 0, { showIfPassed: true }),
  withHandlers({
    onChange: ({ onStepPassed, onStepFailed }) => (
      event,
      newValue,
      previousValue,
    ) =>
      callIfChanged(
        isValid,
        newValue,
        previousValue,
        onStepPassed,
        onStepFailed,
      ),
  }),
)(StepComponent);
