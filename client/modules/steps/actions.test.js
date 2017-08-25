import { isFSA } from 'flux-standard-action';

import * as actions from './actions';
import * as constants from './constants';

describe('actions/stepFailed', () => {
  it('should be fsa compliant action', () => {
    expect(isFSA(actions.stepFailed())).toBe(true);
  });
  it('should return correct type', () => {
    expect(actions.stepFailed().type).toBe(constants.STEP_FAILURE);
  });
  it('should pass the step to payload', () => {
    const stepNumber = 5;
    expect(actions.stepFailed(stepNumber).payload.step).toBe(stepNumber);
  });
});

describe('actions/stepValidated', () => {
  it('should be fsa compliant action', () => {
    expect(isFSA(actions.stepValidated())).toBe(true);
  });
  it('should return correct type', () => {
    expect(actions.stepValidated().type).toBe(constants.STEP_VALIDATE);
  });
  it('should pass the step to payload', () => {
    const stepNumber = 5;
    expect(actions.stepValidated(stepNumber).payload.step).toBe(stepNumber);
  });
});
