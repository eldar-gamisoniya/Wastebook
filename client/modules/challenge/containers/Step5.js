import React from 'react';

import withStep from 'modules/step';
import Step from './Step';
import { FORM_NAME } from '../constants';

export const StepComponent = () =>
  <Step>
    <button type="submit">Submit</button>
  </Step>;

export default withStep(FORM_NAME, 4, { showIfPassed: true })(StepComponent);
