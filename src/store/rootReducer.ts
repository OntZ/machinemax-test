import { combineReducers, AnyAction, Reducer } from "redux";
import machinesReducer from './machines/machinesReducer';
import { IMachinesState } from "./machines/machinesTypes";

export interface IApplicationState {
  machines: IMachinesState;
}

const rootReducer: Reducer<IApplicationState, AnyAction> = combineReducers<IApplicationState>({
  machines: machinesReducer,
});

export default rootReducer;