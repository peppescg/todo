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

const log = (state, action) => {
  getValueFromLS("logTodo")
    ? console.info("Event: ", {
        action: action.type,
        payload: action.payload,
        newState: state,
      })
    : null;
};

/**
 * Save or clear LS
 * Stop evt is default
 */
const saveToLS = ({ record }, action) => {
  log();
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
 * @returns {Object}
 */
const reducer = (state, action) => {
  const handler = actionHandlers[action.type];
  if (handler) {
    const newState = handler(state, action);
    saveToLS(newState, action);
    // if Play Record btn is typed, reset to initialState with 'record': "play" otherwise return the state updated
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
