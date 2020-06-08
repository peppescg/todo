import actions from "./actions";
import { v1 as uuidv1 } from "uuid";

export const actionHandlers = {
  [actions.ADD_TODO]: (state, action) => ({
    ...state,
    todos: [
      {
        id: uuidv1(),
        creationDate: new Date().toISOString(),
        ...action.payload,
      },
      ...state.todos,
    ],
  }),
  [actions.DELETE_TODO]: (state, action) => ({
    ...state,
    todos: state.todos.filter((todo) => todo.id !== action.payload),
  }),
  [actions.UPDATE_TODO]: (state, action) => ({
    ...state,
    todos: state.todos.map(
      (todo) =>
        (todo.id !== action.payload.id && todo) || {
          ...todo,
          ...action.payload,
        }
    ),
  }),
  [actions.COMPLETE_TODO]: (state, action) => ({
    ...state,
    todos: state.todos.map(
      (todo) =>
        (todo.id !== action.payload.id && todo) || {
          ...todo,
          ...action.payload,
        }
    ),
  }),
  [actions.SET_LOADING]: (state, action) => ({
    ...state,
    loading: action.payload,
  }),
  [actions.SET_ERROR]: (state, action) => ({
    ...state,
    error: action.payload,
  }),
  [actions.SET_WINDOW_SIZE]: (state, action) => ({
    ...state,
    isMobile: action.payload,
  }),
  // recording actionsHandlers
  [actions.SET_RECORD]: (state, action) => ({
    ...state,
    record: "record",
  }),
  [actions.SET_PLAY_RECORD]: (state, action) => ({
    ...state,
    record: "play",
  }),
  [actions.SET_CLEAR_RECORD]: (state, action) => ({
    ...state,
    record: "clear",
  }),
  [actions.SET_STOP_RECORD]: (state, action) => ({
    ...state,
    record: "stop",
  }),
};
