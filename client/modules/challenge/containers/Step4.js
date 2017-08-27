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

const renderSelectField = ({
  input,
  label,
  type,
  meta: { touched, error },
  children,
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <select {...input}>
        {children}
      </select>
      {touched &&
        error &&
        <span className="red">
          {error}
        </span>}
    </div>
  </div>;

export const StepComponent = ({ onChange }) =>
  <Step>
    <div>
      <Field
        name="c"
        component={renderSelectField}
        validate={validate}
        onChange={onChange}
      >
        <option />
        <option value="C1">C1</option>
        <option value="C2">C2</option>
        <option value="C3">C3</option>
      </Field>
    </div>
  </Step>;

StepComponent.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default compose(
  withStep(FORM_NAME, 3, { showIfPassed: true }),
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
