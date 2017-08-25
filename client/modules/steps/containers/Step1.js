import React from 'react';
import CheckboxGroup from 'shared/CheckboxGroup';
import Step from './Step';

const step1Options = [
  { label: 'A1', value: 'A1' },
  { label: 'A2', value: 'A2' },
];

const StepComponent = () =>
  <Step>
    <CheckboxGroup name="a" options={step1Options} />
  </Step>;

export default StepComponent;
