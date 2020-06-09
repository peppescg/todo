import React, { useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import { Context, recordingKey } from "../state";
import Button from "./Button";
import actions from "../state/actions";
import { getValueFromLS } from "../utils";

const Record = () => {
  const [{ record }, dispatch] = useContext(Context);
  const events = getValueFromLS(recordingKey) || [];

  useEffect(() => {
    if (record === "play") {
      for (let i = 1; i <= events.length; i++) {
        setTimeout(setDispatchDelay, 1000 * i, events[i - 1]);
      }
    }
  }, [record]);

  function setDispatchDelay(action) {
    if (action) {
      dispatch({ type: action.type, payload: action.payload });
      setErrorForTodoMissing(events, action);
    }
  }

  const setErrorForTodoMissing = (events, action) =>
    events
      .filter((todo) => todo.payload.id === action.payload.id)
      .some((todo) => todo.type === actions.ADD_TODO)
      ? null
      : dispatch({
          type: actions.SET_ERROR,
          payload: "You need a todo to apply a 'complete' event!",
        });

  return (
    <Wrapper>
      <Button
        type="default"
        value="Rec"
        isActive={record}
        onClick={() => dispatch({ type: actions.SET_RECORD })}
      />
      <Button
        type="warning"
        isActive={record}
        value="Stop"
        onClick={() => dispatch({ type: actions.SET_STOP_RECORD })}
      />
      <Button
        type="error"
        isActive={record}
        value="Clear"
        onClick={() => dispatch({ type: actions.SET_CLEAR_RECORD })}
      />
      <Button
        type="success"
        isActive={record}
        value="Play"
        onClick={() => dispatch({ type: actions.SET_PLAY_RECORD })}
      />
      {events.length > 0 && (
        <EventsSection>
          {events.map((evt) => (
            <div key={evt.date}>
              <pre>ActionType: {evt.type}</pre>
              <pre>Payload: {JSON.stringify(evt.payload, undefined, 2)}</pre>
            </div>
          ))}
        </EventsSection>
      )}
    </Wrapper>
  );
};

export default Record;

const Wrapper = styled.div`
  grid-row: 2;

  flex-direction: column;
  & > .button {
    margin: 1em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const EventsSection = styled.section`
  overflow: hidden;
  overflow-y: scroll;
  height: 35vh;
  ${(props) => css`
    @media (max-width: ${props.theme.breakpoints.s}px) {
      display: none;
    }
    color: ${props.theme.colors.textBase};
    & > div {
      margin: 1em;
      box-shadow: 0 8px 6px -6px ${props.theme.colors.textBase};
      background: ${props.theme.colors.textLight};
      & > pre {
        overflow-x: hidden;
        padding: 0.5em 1em;
        @media (max-width: ${props.theme.breakpoints.m}px) {
          font-size: ${props.theme.fontSizes.small};
        }
      }
    }
  `};
`;
