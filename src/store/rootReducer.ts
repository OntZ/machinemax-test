import { combineReducers, AnyAction, Reducer } from "redux";
import reducer from './app/reducer';
import { IAppState } from "./app/types";

export interface IApplicationState {
  app: IAppState
}

const rootReducer: Reducer<IApplicationState, AnyAction> = combineReducers({
  app: reducer,
});

export default rootReducer;