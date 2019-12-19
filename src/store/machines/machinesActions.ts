import { ActionCreator } from "redux";
import { call, put, take, race } from 'redux-saga/effects';

import { MachinesActionTypes, GET_MACHINES_REQUEST, GET_MACHINES_SUCCESS, GET_MACHINES_FAIL, POLL_MACHINES_START, POLL_MACHINES_STOP } from './machinesTypes';
import { MachineService, Machine } from '../../services/MachineService';
import { delay } from '../../utils/delay';

const getMachinesRequest: ActionCreator<MachinesActionTypes> = () => ({
  type: GET_MACHINES_REQUEST
})

const getMachinesSuccess: ActionCreator<MachinesActionTypes> = (machines: Machine[]) => ({
  type: GET_MACHINES_SUCCESS,
  payload: { machines }
})

const getMachinesFail: ActionCreator<MachinesActionTypes> = () => ({
  type: GET_MACHINES_FAIL
})

export const getMachines: ActionCreator<MachinesActionTypes> = () => ({
  type: POLL_MACHINES_START
})

function* pollMachinesSaga() {
  while (true) {
    try {
      yield put(getMachinesRequest());
      const machines = yield call(() => MachineService.getAll());
      yield put(getMachinesSuccess(machines));
      yield call(delay, 10000);
    } catch (err) {
      yield put(getMachinesFail(err));
    }
  }
}

export function* watchPollMachinesSaga() {
	while (true) {
  	yield take(POLL_MACHINES_START);
    yield race([
      call(pollMachinesSaga),
      take(POLL_MACHINES_STOP)
    ]);
  }
}