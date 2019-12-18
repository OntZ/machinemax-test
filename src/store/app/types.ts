import { Action } from "redux";

export const REDUX_WORKS = 'REDUX_WORKS';

export interface IAppState {
  message: string;
}

interface IReduxWorksAction extends Action {
  type: typeof REDUX_WORKS;
  payload: {
    message: string;
  }
}

export type ActionTypes = IReduxWorksAction;