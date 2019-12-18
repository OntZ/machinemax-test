import { ActionCreator } from "redux";
import { ActionTypes, REDUX_WORKS } from "./types";

export const reduxWorks: ActionCreator<ActionTypes> = () => ({
  type: REDUX_WORKS,
  payload: {
    message: 'REDUX WORKS!!!'
  }
});