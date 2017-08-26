import React from 'react';
import { Field } from 'redux-form';

import withStep from 'modules/step';

import Step from './Step';

export const StepComponent = () =>
  <Step>
    <label>
      <Field name="b" component="input" type="radio" value="B1" /> B1
    </label>
    <label>
      <Field name="b" component="input" type="radio" value="B2" />
      B2
    </label>
  </Step>;

export default withStep('challenge', 1, { showIfPassed: true })(StepComponent);
