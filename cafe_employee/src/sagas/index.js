import { all, fork } from 'redux-saga/effects';
import Cafe from './cafe';
/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(Cafe),
  ]);
}
