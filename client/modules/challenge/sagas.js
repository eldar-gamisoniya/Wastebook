import { put, select, call, takeEvery, all } from 'redux-saga/effects';
import {
  getFormValues,
  startAsyncValidation,
  stopAsyncValidation,
  startSubmit,
  stopSubmit,
} from 'redux-form';

import { checkIt, submitIt } from 'api/api';
import { actions as stepActions } from 'modules/step';
import * as constants from './constants';

export function* checkStep3() {
  const formValues = yield select(getFormValues(constants.FORM_NAME));
  const textValue = formValues.text;
  try {
    yield put(stepActions.stepFailed(constants.FORM_NAME, 2));
    yield put(startAsyncValidation(constants.FORM_NAME));
    yield call(checkIt, textValue);
    yield put(stopAsyncValidation(constants.FORM_NAME, {}));
    yield put(stepActions.nextStep(constants.FORM_NAME));
  } catch (e) {
    yield put(stopAsyncValidation(constants.FORM_NAME, { text: e.message }));
  }
}

export function* sendChallenge() {
  const formValues = yield select(getFormValues(constants.FORM_NAME));
  try {
    yield put(startSubmit(constants.FORM_NAME));
    const res = yield call(submitIt, formValues);
    yield put(stopSubmit(constants.FORM_NAME));
    alert(`Submit succeeded, response: ${JSON.stringify(res)}`);
  } catch (e) {
    yield put(stopSubmit(constants.FORM_NAME, { _error: e.message }));
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(constants.SEND_CHALLENGE, sendChallenge),
    takeEvery(constants.CHECK_STEP3, checkStep3),
  ]);
}

export default rootSaga;
