import { Reducer } from 'redux';
import { IAppState, REDUX_WORKS, ActionTypes } from './types';

export const initialState: IAppState = {
  message: ''
};

const reducer: Reducer<IAppState, ActionTypes> = (
  state: IAppState = initialState,
  action: ActionTypes
) => {
  switch (action.type) {
    case REDUX_WORKS:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default reducer;
