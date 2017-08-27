import { isFSA } from 'flux-standard-action';

import * as actions from './actions';
import * as constants from './constants';

describe('actions/checkStep3', () => {
  it('should be fsa compliant action', () => {
    expect(isFSA(actions.checkStep3())).toBe(true);
  });
  it('should return correct type', () => {
    expect(actions.checkStep3().type).toBe(constants.CHECK_STEP3);
  });
});

describe('actions/sendChallenge', () => {
  it('should be fsa compliant action', () => {
    expect(isFSA(actions.sendChallenge())).toBe(true);
  });
  it('should return correct type', () => {
    expect(actions.sendChallenge().type).toBe(constants.SEND_CHALLENGE);
  });
});
