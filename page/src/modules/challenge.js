import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';

import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as challengeAPI from '../lib/api/challenge'
const [GET, GET_SUCCESS, GET_FAILURE] = createRequestActionTypes(
  'challenge/GET',
);

const [SET, SET_SUCCESS, SET_FAILURE] = createRequestActionTypes(
  'challenge/SET',
);

export const set = createAction(SET, ({ u_id, weak, u_level, c_level, c_num, end_date }) => ({
  u_id, weak, u_level, c_level, c_num, end_date
}))

export const get = createAction(GET)

const getSaga = createRequestSaga(GET, challengeAPI.get)
const setSaga = createRequestSaga(SET, challengeAPI.set)
const initialState = {
  challenge: null,
  challengeError: null,
};


export function* challengeSaga() {
  yield takeLatest(SET, setSaga);
  yield takeLatest(GET, getSaga)
}

export default handleActions(
  {
    [SET_SUCCESS]: (state, {payload: challenge}) => ({
      ...state,
      challenge: challenge.row
    }),
    [SET_FAILURE]: (state, {payload: error}) => ({
      ...state,
      challenge: null,
      challengeError: error
    }),
    [GET_SUCCESS]: (state, {payload: challenge}) => ({
      ...state,
      challenge: challenge
    }),
    [GET_FAILURE]: (state, {payload: error}) => ({
      ...state,
      challenge: null,
      challengeError: error
    }),
  },

  initialState,
);