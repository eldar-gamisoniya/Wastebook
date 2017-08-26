import React from 'react';
import { Field } from 'redux-form';

import withStep from 'modules/step';
import CheckboxGroup from 'shared/CheckboxGroup';
import Step from './Step';

const step1Options = [
  { label: 'A1', value: 'A1' },
  { label: 'A2', value: 'A2' },
];

const StepComponent = () =>
  <Step>
    <Field name="a" options={step1Options} component={CheckboxGroup} />;
  </Step>;

export default withStep('challenge', 0, { showIfPassed: true })(StepComponent);
