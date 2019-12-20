import { ActionCreator, AnyAction } from "redux";
import { call, put, take, race } from 'redux-saga/effects';

import {
  MachinesActionTypes,
  GET_MACHINES_REQUEST,
  GET_MACHINES_SUCCESS,
  GET_MACHINES_FAIL,
  POLL_MACHINES_START,
  POLL_MACHINES_STOP,
  GET_MACHINE_BY_ID_REQUEST,
  GET_MACHINE_BY_ID_SUCCESS,
  GET_MACHINE_BY_ID_FAIL,
  POLL_MACHINE_BY_ID_START,
  POLL_MACHINE_BY_ID_STOP,
  IPollMachineByIdStart,
  GET_MACHINE_HISTORY_REQUEST,
  GET_MACHINE_HISTORY_SUCCESS,
  GET_MACHINE_HISTORY_FAIL,
} from './machinesTypes';
import { MachineService, Machine, MachineHistory } from '../../services/MachineService';
import { delay } from '../../utils/delay';
import { ThunkAction, ThunkDispatch } from "redux-thunk";

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

export const stopPollingMachines: ActionCreator<MachinesActionTypes> = () => ({
  type: POLL_MACHINES_STOP
})

function* pollMachinesSaga() {
  while (true) {
    try {
      yield put(getMachinesRequest());
      const machines: Machine[] = yield call(() => MachineService.getAll());
      yield put(getMachinesSuccess(machines));
      yield call(delay, 30000);
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

const getMachineByIdRequest: ActionCreator<MachinesActionTypes> = (id: string) => ({
  type: GET_MACHINE_BY_ID_REQUEST,
  payload: { id }
})

const getMachineByIdSuccess: ActionCreator<MachinesActionTypes> = (machine: Machine) => ({
  type: GET_MACHINE_BY_ID_SUCCESS,
  payload: { machine }
})

const getMachineByIdFail: ActionCreator<MachinesActionTypes> = () => ({
  type: GET_MACHINE_BY_ID_FAIL
})

export const getMachineById: ActionCreator<MachinesActionTypes> = (id: string) => ({
  type: POLL_MACHINE_BY_ID_START,
  payload: { id }
})

export const stopPollingMachineById: ActionCreator<MachinesActionTypes> = () => ({
  type: POLL_MACHINE_BY_ID_STOP
})

function* pollMachineByIdSaga(action: IPollMachineByIdStart) {
  while (true) {
    try {
      yield put(getMachineByIdRequest(action.payload.id));
      const machine: Machine = yield call(() => MachineService.getById(action.payload.id));
      yield put(getMachineByIdSuccess(machine));
      yield call(delay, 30000);
    } catch (err) {
      yield put(getMachineByIdFail(err));
    }
  }
}

export function* watchPollMachineByIdSaga() {
  while (true) {
    const action = yield take(POLL_MACHINE_BY_ID_START);
    yield race([
      call(pollMachineByIdSaga, action),
      take(POLL_MACHINE_BY_ID_STOP)
    ]);
  }
}

const getMachineHistoryRequest: ActionCreator<MachinesActionTypes> = () => ({
  type: GET_MACHINE_HISTORY_REQUEST
})

const getMachineHistorySuccess: ActionCreator<MachinesActionTypes> = (machineHistory: MachineHistory[], id: string) => ({
  type: GET_MACHINE_HISTORY_SUCCESS,
  payload: { machineHistory, id }
})

const getMachineHistoryFail: ActionCreator<MachinesActionTypes> = () => ({
  type: GET_MACHINE_HISTORY_FAIL
})

export const getMachineHistory = (id: string): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getMachineHistoryRequest());
    try {
      const machineHistory = await MachineService.getHistory(id);

      dispatch(getMachineHistorySuccess(machineHistory, id));
    } catch (err) {
      dispatch(getMachineHistoryFail(err));
      await delay(1000);
      getMachineHistory(id);
    }

    return;
  };
};

// export function* getMachineHistory(id: string) {
//   console.log('sadasdsadsa');
//   try {
//     yield put(getMachineHistoryRequest());
//     const machineHistory: MachineHistory[] = yield call(() => MachineService.getHistory(id));
//     yield put(getMachineHistorySuccess(machineHistory, id));
//   } catch (err) {
//     yield put(getMachineHistoryFail(err));
//   }
// }