/**
 * @module Sagas/Employee
 * @desc Employee
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getEmployees } from '../service/employee.service';
import { LOAD_EMPLOYEES_LOADING, LOAD_EMPLOYEES_SUCCESS, LOAD_EMPLOYEES_ERROR } from '../uitls/constant'
/**
 * Get all data
 */
export function* handleGet({ payload }) {
  try {
    const result = yield call(getEmployees, payload);
    yield put({ type: LOAD_EMPLOYEES_SUCCESS, data: result.employees });
  } catch (error) {
    yield put({ type: LOAD_EMPLOYEES_ERROR, error: error.message });
  }
}

/**
 * Common Sagas
 */
export default function* root() {
  yield all([takeLatest(LOAD_EMPLOYEES_LOADING, handleGet)]);
}


