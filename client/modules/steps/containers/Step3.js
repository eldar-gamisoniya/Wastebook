import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

import Step from './Step';

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>;

export const StepComponent = ({ onClickHandler }) =>
  <Step>
    <div>
      <Field
        name="text"
        component={renderField}
        type="text"
        placeholder="text"
      />
      <button onClick={onClickHandler} type="button">
        click
      </button>
    </div>
  </Step>;

StepComponent.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
};

export default StepComponent;
