import { Action } from "redux";
import { Machine, MachinesEndpointStatus } from "../../services/MachineService";

export const GET_MACHINES_REQUEST = 'GET_MACHINES_REQUEST';
export const GET_MACHINES_SUCCESS = 'GET_MACHINES_SUCCESS';
export const GET_MACHINES_FAIL = 'GET_MACHINES_FAIL';

export interface IMachinesState {
  machines: Machine[];
  machinesLoadedLast?: Date;
  machinesEndpointStatus: MachinesEndpointStatus;
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
  IGetMachinesRequestAction
  | IGetMachinesSuccessAction
  | IGetMachinesFailAction;