import { ActionCreator, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { MachinesActionTypes, GET_MACHINES_REQUEST, GET_MACHINES_SUCCESS, GET_MACHINES_FAIL } from "./machinesTypes";
import { MachineService, Machine } from "../../services/MachineService";

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

export const getMachines = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(getMachinesRequest());
    try {
      const machines = await MachineService.getAll();

      dispatch(getMachinesSuccess(machines));
    } catch {
      dispatch(getMachinesFail());
    }

    return;
  };
};