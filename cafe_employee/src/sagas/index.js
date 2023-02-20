import { all, fork } from 'redux-saga/effects';
import Cafe from './cafe';
import Employee from './employee';
/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(Cafe),
    fork(Employee),
  ]);
}
