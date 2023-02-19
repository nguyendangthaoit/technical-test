/**
 * @module Sagas/Cafe
 * @desc Cafe
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getCafes } from '../service/cafe.service';
import { LOAD_CAFES_LOADING, LOAD_CAFES_SUCCESS, LOAD_CAFES_ERROR } from '../uitls/constant'
/**
 * Get all data
 */
export function* handleGet({ payload }) {
  try {
    const result = yield call(getCafes, payload);
    yield put({ type: LOAD_CAFES_SUCCESS, data: result.cafes });
  } catch (error) {
    yield put({ type: LOAD_CAFES_ERROR, error: error.message });
  }
}

/**
 * Common Sagas
 */
export default function* root() {
  yield all([takeLatest(LOAD_CAFES_LOADING, handleGet)]);
}


