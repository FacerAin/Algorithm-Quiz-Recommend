import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import challenge, {challengeSaga} from './challenge'
const rootReducer = combineReducers({
  auth,
  loading,
  user,
  challenge
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), challengeSaga()]);
}

export default rootReducer;