import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import styled, { ThemeContext, css } from "styled-components";
import { Bin, Pencil2 } from "@styled-icons/icomoon";
import { Context } from "../state";
import actions from "../state/actions";

const Todo = (props) => {
  const { fontSizes } = useContext(ThemeContext);
  const [, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const { name, description, isDone, id } = props;

  const setComplete = () => {
    dispatch({
      type: actions.COMPLETE_TODO,
      payload: { ...props, isDone: true },
    });
  };

  return (
    <Wrapper isDone={isDone} id={id}>
      <Name isDone={isDone} onClick={() => setComplete()}>
        {name}
      </Name>
      <ActionsGrp>
        <Edit
          data-testid="edit-todo"
          onClick={() => navigate(`detail/${id}`)}
          size={fontSizes.large}
        />
        <Delete
          size={fontSizes.large}
          data-testid="remove-todo"
          onClick={() => dispatch({ type: actions.DELETE_TODO, payload: id })}
        />
      </ActionsGrp>
    </Wrapper>
  );
};

export default Todo;

const Wrapper = styled.article`
  opacity: ${({ isDone }) => (isDone && 0.3) || 0.9};

  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  height: 7vh;
  width: 50vw;
  margin: 3vh auto;
  ${(props) => css`
    background-color: ${props.theme.colors.textLight};
    @media (min-width: ${props.theme.breakpoints.l}px) {
      width: 40vw;
    }
  `}
  border-radius: 5px;
  &:hover {
    background-color: #f5fafd;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;
`;

const Name = styled.p`
  ${(props) => css`
    color: ${props.theme.colors.primaryDark};
    font-size: ${props.theme.fontSizes.large};
    @media (max-width: ${props.theme.breakpoints.l}px) {
      font-size: ${props.theme.fontSizes.medium};
    }
  `}
  width: 20vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: ${({ isDone }) => {
    return (isDone && "line-through") || "none";
  }};

  &:hover {
    cursor: pointer;
    opacity: ${({ isDone }) => {
      return (isDone && 0.9) || 0.3;
    }};
    text-decoration: ${({ isDone }) => {
      return (isDone && "none") || "line-through";
    }};
  }
`;

const Edit = styled(Pencil2)`
  ${(props) => css`
    cursor: pointer;
    color: ${props.theme.colors.primaryBase};
    &:hover {
      color: ${props.theme.colors.primaryDark};
      opacity: 0.9;
    }
  `}
`;

const Delete = styled(Bin)`
  ${(props) => css`
    cursor: pointer;
    color: ${props.theme.colors.errorBase};
    &:hover {
      color: ${props.theme.colors.errorDark};
      opacity: 0.9;
    }
  `}
`;

const ActionsGrp = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-evenly;
`;
