import { all } from 'redux-saga/effects';
import { watchPollMachinesSaga, watchPollMachineByIdSaga } from './machines/machinesActions';

export default function* rootSaga() {
  yield all([
    watchPollMachinesSaga(),
    watchPollMachineByIdSaga()
  ])
}