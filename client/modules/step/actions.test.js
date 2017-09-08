import { isFSA } from 'flux-standard-action';

import * as actions from './actions';
import * as constants from './constants';

describe('actions/stepFailed', () => {
  it('should be fsa compliant action', () => {
    expect(isFSA(actions.stepFailed('test'))).toBe(true);
  });
  it('should return correct type', () => {
    expect(actions.stepFailed('test').type).toBe(constants.STEP_FAILURE);
  });
  it('should pass the step to payload', () => {
    const stepNumber = 5;
    expect(actions.stepFailed('test', stepNumber).payload.step).toBe(
      stepNumber,
    );
  });
});

describe('actions/nextStep', () => {
  it('should be fsa compliant action', () => {
    expect(isFSA(actions.nextStep('test'))).toBe(true);
  });
  it('should return correct type', () => {
    expect(actions.nextStep('test').type).toBe(constants.NEXT_STEP);
  });
});

describe('actions/previousStep', () => {
  it('should be fsa compliant action', () => {
    expect(isFSA(actions.previousStep('test'))).toBe(true);
  });
  it('should return correct type', () => {
    expect(actions.previousStep('test').type).toBe(constants.PREVIOUS_STEP);
  });
});
