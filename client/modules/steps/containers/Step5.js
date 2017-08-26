import React from 'react';

import withStep from 'modules/step';
import Step from './Step';

export const StepComponent = () =>
  <Step>
    <button type="submit">Submit</button>
  </Step>;

export default withStep('challenge', 4, { showIfPassed: true })(StepComponent);
