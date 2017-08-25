import stepsReducer, { getCurrentStep } from './reducer';
import { stepFailed, stepValidated } from './actions';

const createInitialState = () => stepsReducer(undefined, {});

describe('steps reducer', () => {
  it('should return initial state with the first step', () => {
    const state = createInitialState();
    expect(getCurrentStep(state)).toBe(1);
  });
  it('should switch to the second step', () => {
    const initialState = createInitialState();
    const action = stepValidated(1);
    const newState = stepsReducer(initialState, action);
    expect(getCurrentStep(newState)).toBe(2);
  });
  it('should switch to the next steps and then return to the first after failure', () => {
    const initialState = createInitialState();
    const step2State = stepsReducer(initialState, stepValidated(2));
    const step3State = stepsReducer(step2State, stepValidated(3));
    const failState = stepsReducer(step3State, stepFailed(1));
    expect(getCurrentStep(failState)).toBe(1);
  });
});
