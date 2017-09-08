import { compose } from 'ramda';

import reducer, { getCurrentStep } from './reducer';
import { stepFailed, nextStep, previousStep } from './actions';

const createInitialState = () => reducer(undefined, {});

describe('step reducer', () => {
  it('should return initial state without any sequences', () => {
    const state = createInitialState();
    expect(Object.keys(state)).toHaveLength(0);
  });
  it('should return step 0 for uninitialized sequence', () => {
    const state = createInitialState();
    expect(getCurrentStep(state, 'test')).toBe(0);
  });
  it('should switch to the step 1', () => {
    const initialState = createInitialState();
    const state = compose(s => reducer(s, nextStep('test')))(initialState);
    expect(getCurrentStep(state, 'test')).toBe(1);
  });
  it('should switch to the next step and then return back', () => {
    const initialState = createInitialState();
    const state = compose(
      s => reducer(s, previousStep('test')),
      s => reducer(s, nextStep('test')),
      s => reducer(s, nextStep('test')),
    )(initialState);
    expect(getCurrentStep(state, 'test')).toBe(1);
  });
  it('should switch to the next steps and then return to the previous after failure', () => {
    const initialState = createInitialState();
    const state = compose(
      s => reducer(s, stepFailed('test', 1)),
      s => reducer(s, nextStep('test')),
      s => reducer(s, nextStep('test')),
    )(initialState);
    expect(getCurrentStep(state, 'test')).toBe(1);
  });
  it('should switch to the next steps and then return to the initial after failure', () => {
    const initialState = createInitialState();
    const state = compose(
      s => reducer(s, stepFailed('test', 2, true)),
      s => reducer(s, nextStep('test')),
      s => reducer(s, nextStep('test')),
    )(initialState);
    expect(getCurrentStep(state, 'test')).toBe(0);
  });
  it('should fail and then go to the next step through valid steps', () => {
    const initialState = createInitialState();
    const state = compose(
      s => reducer(s, nextStep('test')),
      s => reducer(s, stepFailed('test', 1, false)),
      s => reducer(s, nextStep('test')),
      s => reducer(s, nextStep('test')),
      s => reducer(s, nextStep('test')),
    )(initialState);
    expect(getCurrentStep(state, 'test')).toBe(3);
  });
  it('should fail and go to the start and then go to the next step through valid steps', () => {
    const initialState = createInitialState();
    const state = compose(
      s => reducer(s, nextStep('test')),
      s => reducer(s, stepFailed('test', 2, true)),
      s => reducer(s, nextStep('test')),
      s => reducer(s, nextStep('test')),
      s => reducer(s, nextStep('test')),
    )(initialState);
    expect(getCurrentStep(state, 'test')).toBe(2);
  });
});
