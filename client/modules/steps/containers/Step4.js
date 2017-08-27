import React from 'react';
import { Field } from 'redux-form';

import withStep from 'modules/step';
import Step from './Step';
import { FORM_NAME } from '../constants';

export const StepComponent = () =>
  <Step>
    <div>
      <Field name="c" component="select">
        <option />
        <option value="C1">C1</option>
        <option value="C2">C2</option>
        <option value="C3">C3</option>
      </Field>
    </div>
  </Step>;

export default withStep(FORM_NAME, 3, { showIfPassed: true })(StepComponent);
