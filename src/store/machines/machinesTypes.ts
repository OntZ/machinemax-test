import { Action } from "redux";
import { Machine, MachinesEndpointStatus, MachineHistory } from "../../services/MachineService";

export const GET_MACHINES_REQUEST = 'GET_MACHINES_REQUEST';
export const GET_MACHINES_SUCCESS = 'GET_MACHINES_SUCCESS';
export const GET_MACHINES_FAIL = 'GET_MACHINES_FAIL';
export const POLL_MACHINES_START = 'POLL_MACHINES_START';
export const POLL_MACHINES_STOP = 'POLL_MACHINES_STOP';
export const GET_MACHINE_BY_ID_REQUEST = 'GET_MACHINE_BY_ID_REQUEST';
export const GET_MACHINE_BY_ID_SUCCESS = 'GET_MACHINE_BY_ID_SUCCESS';
export const GET_MACHINE_BY_ID_FAIL = 'GET_MACHINE_BY_ID_FAIL';
export const GET_MACHINE_HISTORY_REQUEST = 'GET_MACHINE_HISTORY_REQUEST';
export const GET_MACHINE_HISTORY_SUCCESS = 'GET_MACHINE_HISTORY_SUCCESS';
export const GET_MACHINE_HISTORY_FAIL = 'GET_MACHINE_HISTORY_FAIL';
export const POLL_MACHINE_BY_ID_START = 'POLL_MACHINE_BY_ID_START';
export const POLL_MACHINE_BY_ID_STOP = 'POLL_MACHINE_BY_ID_STOP';

export interface IMachinesState {
  machines: Machine[];
  machinesLoadedLast?: Date;
  machinesEndpointStatus: MachinesEndpointStatus;
  machineById: {
    [id: string]: {
      machine: Machine;
      loadedLast: Date;
    }
  };
  machineByIdEndpointStatus: MachinesEndpointStatus;
  machineHistoryById: {
    [id: string]: MachineHistory[];
  }
}

interface IPollMachinesStart extends Action {
  type: typeof POLL_MACHINES_START;
}

interface IPollMachinesStop extends Action {
  type: typeof POLL_MACHINES_STOP;
}

interface IGetMachinesRequestAction extends Action {
  type: typeof GET_MACHINES_REQUEST;
}

interface IGetMachinesSuccessAction extends Action {
  type: typeof GET_MACHINES_SUCCESS;
  payload: {
    machines: Machine[];
  }
}
interface IGetMachinesFailAction extends Action {
  type: typeof GET_MACHINES_FAIL;
}

export interface IPollMachineByIdStart extends Action {
  type: typeof POLL_MACHINE_BY_ID_START;
  payload: {
    id: string;
  }
}

interface IPollMachineByIdStop extends Action {
  type: typeof POLL_MACHINE_BY_ID_STOP;
}

interface IGetMachineByIdRequestAction extends Action {
  type: typeof GET_MACHINE_BY_ID_REQUEST;
}

interface IGetMachineByIdSuccessAction extends Action {
  type: typeof GET_MACHINE_BY_ID_SUCCESS;
  payload: {
    machine: Machine;
  }
}

interface IGetMachineByIdFailAction extends Action {
  type: typeof GET_MACHINE_BY_ID_FAIL;
}

interface IGetMachineHistoryRequestAction extends Action {
  type: typeof GET_MACHINE_HISTORY_REQUEST;
}

interface IGetMachineHistorySuccessAction extends Action {
  type: typeof GET_MACHINE_HISTORY_SUCCESS;
  payload: {
    id: string;
    machineHistory: MachineHistory[];
  }
}
interface IGetMachineHistoryFailAction extends Action {
  type: typeof GET_MACHINE_HISTORY_FAIL;
}

export type MachinesActionTypes =
  IPollMachinesStart
  | IPollMachinesStop
  | IGetMachinesRequestAction
  | IGetMachinesSuccessAction
  | IGetMachinesFailAction
  | IPollMachineByIdStart
  | IPollMachineByIdStop
  | IGetMachineByIdRequestAction
  | IGetMachineByIdSuccessAction
  | IGetMachineByIdFailAction
  | IGetMachineHistoryRequestAction
  | IGetMachineHistorySuccessAction
  | IGetMachineHistoryFailAction;