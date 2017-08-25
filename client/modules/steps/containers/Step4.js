import React from 'react';
import { Field } from 'redux-form';

import Step from './Step';

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

export default StepComponent;
