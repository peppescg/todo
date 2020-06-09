import React, { createContext, useReducer } from "react";
import { actionHandlers } from "./handlers";
import {
  isMobileSize,
  removeFromLS,
  actionsToRecord,
  getValueFromLS,
  setValueToLS,
} from "../utils";
import actions from "./actions";

export const recordingKey = "recordingKeyLS";

const initialState = {
  todos: [],
  loading: false,
  error: null,
  isMobile: isMobileSize(),
  record: "stop",
};

/**
 * Log to console
 * Set to LS logTodo: true
 */
const log = (action) => {
  getValueFromLS("logTodo")
    ? console.info("Event: ", {
        action: action.type,
        payload: action.payload,
      })
    : null;
};

/**
 * Save or clear LS
 * Stop evt is default
 */
const saveToLS = ({ record }, action) => {
  console.log("CAIONE", record, action);
  log(action);
  if (record === "record") {
    if (actionsToRecord(action.type)) {
      let recordingList = getValueFromLS(recordingKey);
      if (recordingList) {
        recordingList.push({ ...action, date: new Date().toISOString() });
        setValueToLS(recordingKey, recordingList);
      } else {
        setValueToLS(recordingKey, [
          { ...action, date: new Date().toISOString() },
        ]);
      }
    }
  }
  if (record === "clear") {
    removeFromLS(recordingKey);
  }
};

/**
 * Modify the state.
 * Through action type retrieve actionHandlers for update state
 * @returns {Object}
 */
const reducer = (state, action) => {
  console.log("1: ", action);
  const handler = actionHandlers[action.type];
  if (handler) {
    const newState = handler(state, action);
    saveToLS(newState, action);
    return action.type === actions.SET_PLAY_RECORD
      ? { ...initialState, record: "play" }
      : newState;
  }
  return state;
};

export const Context = createContext();

/**
 * Create context for share data through app tree.
 */
export const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  );
};
