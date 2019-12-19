import { all } from 'redux-saga/effects';
import { watchPollMachinesSaga } from './machines/machinesActions';

export default function* rootSaga() {
  yield all([
    watchPollMachinesSaga(),
  ])
}