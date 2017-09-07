import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { compose, withHandlers } from 'recompose';

import withStep from 'modules/step';
import Step from './Step';
import { callIfChanged } from '../utils';
import { FORM_NAME } from '../constants';

const isValid = value => Boolean(value);

const validate = value => (!isValid(value) ? 'Should be set' : undefined);

const StepComponent = ({ onChange }) =>
  <Step>
    <label>
      <Field
        name="b"
        component="input"
        type="radio"
        validate={validate}
        value="B1"
        onChange={onChange}
      />{' '}
      B1
    </label>
    <label>
      <Field
        name="b"
        component="input"
        type="radio"
        validate={validate}
        value="B2"
        onChange={onChange}
      />
      B2
    </label>
  </Step>;

StepComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default compose(
  withStep(FORM_NAME, 1, { showIfPassed: true }),
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
