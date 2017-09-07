import React from 'react';
import { bindActionCreators } from 'redux';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import withStep from 'modules/step';
import Step from './Step';
import { FORM_NAME } from '../constants';
import * as actions from '../actions';

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched &&
        error &&
        <span className="red">
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

export default compose(
  withStep(FORM_NAME, 2, { showIfPassed: true }),
  connect(null, dispatch => bindActionCreators(actions, dispatch)),
  withHandlers({
    onClickHandler: ({ checkStep3 }) => () => checkStep3(),
  }),
)(StepComponent);
