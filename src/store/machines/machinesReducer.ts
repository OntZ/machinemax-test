import { Reducer } from 'redux';
import { IMachinesState, MachinesActionTypes, GET_MACHINES_REQUEST, GET_MACHINES_FAIL, GET_MACHINES_SUCCESS } from './machinesTypes';

export const initialState: IMachinesState = {
  machines: []
};

const reducer: Reducer<IMachinesState, MachinesActionTypes> = (
  state: IMachinesState = initialState,
  action: MachinesActionTypes
) => {
  switch (action.type) {
    case GET_MACHINES_REQUEST:
    case GET_MACHINES_FAIL:
      return state;
    case GET_MACHINES_SUCCESS:
      return {
        ...state,
        machines: action.payload.machines
      }
    default:
      return state;
  }
};

export default reducer;
