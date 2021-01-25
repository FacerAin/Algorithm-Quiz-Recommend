import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import * as userAPI from '../lib/api/user'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const TEMP_SET_USER = 'user/TEMP_SET_USER';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
  'user/CHECK',
);
const [GET, GET_SUCCESS, GET_FAILURE] = createRequestActionTypes(
  'user/GET',
);
const [SYNCBJ, SYNCBJ_SUCCESS, SYNCBJ_FAILURE] = createRequestActionTypes(
  'user/SYNCBJ',
);
const [LEVEL, LEVEL_SUCCESS, LEVEL_FAILURE] = createRequestActionTypes(
  'user/LEVEL',
);
const [WEAK, WEAK_SUCCESS, WEAK_FAILURE] = createRequestActionTypes(
  'user/WEAK',
);

const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);
export const get = createAction(GET, ({ username }) => (
  {
    username
  }))
export const syncbj = createAction(SYNCBJ, ({ username }) => ({
  username
}
))

export const level = createAction(LEVEL, ({username}) => ({
  username
}))

export const weak = createAction(WEAK, ({username}) => ({
  username
}))

const checkSaga = createRequestSaga(CHECK, authAPI.check);
const getSaga = createRequestSaga(GET, userAPI.getid)
const syncbjSaga = createRequestSaga(SYNCBJ, userAPI.syncbj)
const levelSaga = createRequestSaga(LEVEL, userAPI.level)
const weakSaga = createRequestSaga(WEAK, userAPI.weak)
function checkFailureSaga() {
  try {
    localStorage.removeItem('user');
  } catch (e) {
    console.log('localStroage is not working');
  }
}
function* logoutSaga() {
  try {
    yield call(authAPI.logout);
    console.log('logout');
    localStorage.removeItem('user');
  } catch (e) {
    console.log(e);
  }
}
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
  yield takeLatest(GET, getSaga)
  yield takeLatest(SYNCBJ, syncbjSaga)
  yield takeLatest(LEVEL, levelSaga)
  yield takeLatest(WEAK, weakSaga)
}

const initialState = {
  user: null,
  weak: null,
  checkError: null,
  profile: null,
  profileError: null,
  syncbjError: null,
  weakError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      user,
    }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      user: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      user: null,
    }),
    [GET_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      profile: user.row[0]
    }),
    [GET_FAILURE]: (state, { payload: error }) => ({
      ...state,
      profile: null,
      profileError: error
    }),
    [SYNCBJ_SUCCESS]: (state) => ({
      ...state,
      syncbjError: null
    }),
    [SYNCBJ_FAILURE]: (state, { payload: error }) => ({
      ...state,
      syncbjError: error
    }),
    [WEAK_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      weak: data
    }),
    [SYNCBJ_FAILURE]: (state, { payload: error }) => ({
      ...state,
      weakError: error
    })
  },
  initialState,
);