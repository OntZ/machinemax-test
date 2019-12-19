import { Reducer } from 'redux';
import { IMachinesState, MachinesActionTypes, GET_MACHINES_REQUEST, GET_MACHINES_FAIL, GET_MACHINES_SUCCESS } from './machinesTypes';
import { MachinesEndpointStatus } from '../../services/MachineService';

export const initialState: IMachinesState = {
  machines: [],
  machinesEndpointStatus: MachinesEndpointStatus.Active
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
    default:
      return state;
  }
};

export default reducer;
