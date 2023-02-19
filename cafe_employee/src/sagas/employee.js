/**
 * @module Sagas/Cafe
 * @desc Cafe
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getCafes } from '../service/cafe.service';
import { Cafe_get } from '../uitls/constant'
/**
 * Get all data
 */
export function* handleGet({ payload }) {
  try {
    const result = yield call(getCafes, payload.location);
    debugger
    // yield put({
    //   type: ActionTypes.GET_ALL_PRODUCT_TYPES_SUCCESS,
    //   payload: result.data,
    // });
  } catch (error) {
    debugger
    // console.error(error);
    // yield put({ type: ActionTypes.GET_ALL_PRODUCT_TYPES_FAILURE, message: error });
    // /* Show Error Message */
    // yield put(showAlert(`Get Data Failed. Error: ${error}`, { variant: 'danger', timeout: 5 }));
  }
}

/**
 * Common Sagas
 */
export default function* root() {
  yield all([takeLatest(Cafe_get, handleGet)]);
}
