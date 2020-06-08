import React, { useContext, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Context } from "../state";
import actions from "../state/actions";
import { Modal } from "./Modal";
import DetailMobile from "./DetailMobile";

const TodoMobile = (props) => {
  const [, dispatch] = useContext(Context);
  const [clientX, setClientX] = useState();
  const [swipedRight, setSwipeRight] = useState(false);
  const [isModalOpen, setModal] = useState(false);
  const { name, description, isDone, id } = props;

  const onTouchMoveHandler = (e) => {
    if (!clientX) {
      return setClientX(e.touches[0].clientX);
    }
    const diff = e.touches[0].clientX - clientX;
    if (diff > 100) {
      setSwipeRight(true);
    }
  };

  const onTouchEndHandler = (e) => {
    if (swipedRight) {
      setTimeout(() => {
        dispatch({
          type: actions.COMPLETE_TODO,
          payload: { ...props, isDone: true },
        });
        setSwipeRight(false);
      }, 500);
    }
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => setModal(false)}>
          <DetailMobile id={id} onClose={() => setModal(false)} />
        </Modal>
      )}
      <WithSwipeRight
        onTouchMove={onTouchMoveHandler}
        onTouchEnd={onTouchEndHandler}
      >
        {swipedRight && <Done>DONE</Done>}
        <Wrapper
          className={swipedRight ? "swiped" : "not-swiped"}
          swipedRight={swipedRight}
          isDone={isDone}
        >
          <Name isDone={isDone} onClick={() => setModal(true)}>
            {name}
          </Name>
        </Wrapper>
      </WithSwipeRight>
    </>
  );
};

export default TodoMobile;

const swipe = keyframes`
  0% { margin-left: auto }
  30% { margin-left: 5vw }
  60% {margin-left: 10vw }
  100% {margin-left: 15vw }
`;

const Done = styled.span`
  margin-left: 2vw;
  ${(props) => css`
    color: ${props.theme.colors.textLight};
  `}
`;

const Wrapper = styled.article`
  opacity: ${({ isDone }) => (isDone && 0.3) || 0.9};
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  height: 5vh;
  width: 60vw;
  margin: 3vh auto;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => css`
    background-color: ${props.theme.colors.textLight};
  `}
`;

const WithSwipeRight = styled.div`
  opacity: ${({ isDone }) => {
    return (isDone && 0.3) || 0.9;
  }};
  ${(props) => css`
    color: ${props.theme.colors.textLight};
    background-color: ${props.theme.colors.successLight};
  `}
  border-radius: 5px;
  position: relative;
  margin: 3vh auto;
  width: 60vw;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: start;

  & > .swiped {
    animation: ${swipe} ease-out 1.2s;
    margin-left: 15vw;
  }
`;

const Name = styled.p`
  width: 50vh;
  padding-left: 5vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: ${({ isDone }) => {
    return (isDone && "line-through") || "none";
  }};
  cursor: pointer;
  ${(props) => css`
    color: ${props.theme.colors.primaryDark};
    font-size: ${props.theme.fontSizes.medium};
  `};
`;
