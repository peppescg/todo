import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import styled, { ThemeContext, css } from "styled-components";
import { Context } from "../state";
import actions from "../state/actions";
import { Checkbox, CheckboxWrapper } from "../components/Checkbox";
import { Submit, SubmitWrapper } from "../components/Submit";
import { InputText, InputWrapper } from "../components/InputText";
import Textarea from "../components/Textarea";
import TodoWrapper from "../components/TodoWrapper";
import { Label } from "../components/Label";
import { formatDate } from "../utils";
import withErrorHandler from "../components/ErrorBoundary";
import { DeleteBtn, BtnGroups } from "../components/DeleteBtn";
import DetailMobile from "../components/DetailMobile";

const Detail = ({ id }) => {
  const { fontSizes } = useContext(ThemeContext);
  const [{ loading, todos, isMobile }, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    navigate("/");
  }
  const [name, setName] = useState((todo && todo.name) || "");
  const [description, setDescription] = useState(
    (todo && todo.description) || ""
  );
  const [isDone, setStatus] = useState((todo && todo.isDone) || false);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: actions.SET_LOADING, payload: true });
    // simulate async action for trigger spinner
    setTimeout(() => {
      dispatch({
        type: actions.UPDATE_TODO,
        payload: { ...todo, isDone, description, name },
      });
      dispatch({ type: actions.SET_LOADING, payload: false });
      navigate("/");
    }, 1000);
  }

  function onDeleteHandler(e) {
    e.preventDefault();
    // simulate async action for trigger spinner
    setTimeout(() => {
      dispatch({ type: actions.DELETE_TODO, payload: id });
      navigate("/");
    }, 500);
  }

  return (
    <>
      {isMobile ? (
        <DetailMobile {...todo} />
      ) : (
        <TodoWrapper>
          <Form onSubmit={handleSubmit}>
            <Label>Creation date</Label>
            <CreationDate>{todo && formatDate(todo.creationDate)}</CreationDate>
            <InputWrapper>
              <Label>Name</Label>
              <InputText
                id="name"
                type="text"
                placeholder="Insert a title"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Description</Label>
              <Textarea
                id="description"
                value={description}
                placeholder="Insert a description..."
                onChange={(e) => setDescription(e.target.value)}
              />
              <CheckboxWrapper>
                <Label>Status</Label>
                <Checkbox
                  checked={isDone}
                  size={fontSizes.large}
                  onCheck={() => setStatus(!isDone)}
                />
              </CheckboxWrapper>
            </InputWrapper>
            <BtnGroups>
              <DeleteBtn onClick={onDeleteHandler}>Delete</DeleteBtn>

              <SubmitWrapper>
                <Submit type="submit" value="Update" loading={loading} />
              </SubmitWrapper>
            </BtnGroups>
          </Form>
        </TodoWrapper>
      )}
    </>
  );
};

export default withErrorHandler(Detail);

const Form = styled.form`
  ${InputWrapper} {
    padding: 3vh 0;
  }
  ${CheckboxWrapper} {
    margin: 3vh 0;
  }
`;

const CreationDate = styled.span`
  ${(props) => css`
    margin-left: 1em;
    color: ${props.theme.colors.primaryDark};
  `}
`;
