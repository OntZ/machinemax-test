import { Reducer } from 'redux';
import {
  IMachinesState,
  MachinesActionTypes,
  GET_MACHINES_REQUEST,
  GET_MACHINES_FAIL,
  GET_MACHINES_SUCCESS,
  GET_MACHINE_BY_ID_REQUEST,
  GET_MACHINE_BY_ID_FAIL,
  GET_MACHINE_BY_ID_SUCCESS,
  GET_MACHINE_HISTORY_FAIL,
  GET_MACHINE_HISTORY_REQUEST,
  GET_MACHINE_HISTORY_SUCCESS
} from './machinesTypes';
import { MachinesEndpointStatus } from '../../services/MachineService';

export const initialState: IMachinesState = {
  machines: [],
  machinesEndpointStatus: MachinesEndpointStatus.Active,
  machineById: {},
  machineByIdEndpointStatus: MachinesEndpointStatus.Active,
  machineHistoryById: {},
};

const reducer: Reducer<IMachinesState, MachinesActionTypes> = (
  state: IMachinesState = initialState,
  action: MachinesActionTypes
) => {
  switch (action.type) {
    case GET_MACHINES_REQUEST:
      return state;
    case GET_MACHINES_FAIL:
      return {
        ...state,
        machinesEndpointStatus: MachinesEndpointStatus.Problem
      };
    case GET_MACHINES_SUCCESS:
      return {
        ...state,
        machines: action.payload.machines,
        machinesLoadedLast: new Date(),
        machinesEndpointStatus: MachinesEndpointStatus.Active
      }
    case GET_MACHINE_BY_ID_REQUEST:
      return state;
    case GET_MACHINE_BY_ID_FAIL:
      return {
        ...state,
        machineByIdEndpointStatus: MachinesEndpointStatus.Problem
      };
    case GET_MACHINE_BY_ID_SUCCESS:
      const machine = action.payload.machine;
      return {
        ...state,
        machineById: {
          ...state.machineById,
          [machine.id]: {
            machine,
            loadedLast: new Date()
          }
        },
        machineByIdEndpointStatus: MachinesEndpointStatus.Active
      }
    case GET_MACHINE_HISTORY_REQUEST:
    case GET_MACHINE_HISTORY_FAIL:
      return state;
    case GET_MACHINE_HISTORY_SUCCESS:
      const machineHistory = action.payload.machineHistory;
      const id = action.payload.id;
      return {
        ...state,
        machineHistoryById: {
          ...state.machineHistoryById,
          [id]: machineHistory
        }
      }
    default:
      return state;
  }
};

export default reducer;
