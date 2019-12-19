import { Action } from "redux";
import { Machine, MachinesEndpointStatus } from "../../services/MachineService";

export const GET_MACHINES_REQUEST = 'GET_MACHINES_REQUEST';
export const GET_MACHINES_SUCCESS = 'GET_MACHINES_SUCCESS';
export const GET_MACHINES_FAIL = 'GET_MACHINES_FAIL';
export const POLL_MACHINES_START = 'POLL_MACHINES_START';
export const POLL_MACHINES_STOP = 'POLL_MACHINES_STOP';

export interface IMachinesState {
  machines: Machine[];
  machinesLoadedLast?: Date;
  machinesEndpointStatus: MachinesEndpointStatus;
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

export type MachinesActionTypes =
  IPollMachinesStart
  | IPollMachinesStop
  | IGetMachinesRequestAction
  | IGetMachinesSuccessAction
  | IGetMachinesFailAction;