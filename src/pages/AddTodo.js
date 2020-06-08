import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import styled, { ThemeContext } from "styled-components";
import { Context } from "../state";
import actions from "../state/actions";
import { Checkbox, CheckboxWrapper } from "../components/Checkbox";
import { Submit, SubmitWrapper } from "../components/Submit";
import { InputText, InputWrapper } from "../components/InputText";
import Textarea from "../components/Textarea";
import TodoWrapper from "../components/TodoWrapper";
import { Label } from "../components/Label";
import AddTodoMobile from "../components/AddTodoMobile";
import withErrorHandler from "../components/ErrorBoundary";

const AddTodo = () => {
  const { fontSizes } = useContext(ThemeContext);
  const [{ loading, isMobile }, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDone, setStatus] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: actions.SET_LOADING, payload: true });
    // simulate async action for trigger spinner
    setTimeout(() => {
      dispatch({
        type: actions.ADD_TODO,
        payload: { isDone, description, name },
      });
      dispatch({ type: actions.SET_LOADING, payload: false });
      navigate("/");
    }, 1000);
  }
  return (
    <>
      {isMobile ? (
        <AddTodoMobile />
      ) : (
        <TodoWrapper>
          <Form onSubmit={handleSubmit}>
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
            <SubmitWrapper>
              <Submit type="submit" value="Add" loading={loading} />
            </SubmitWrapper>
          </Form>
        </TodoWrapper>
      )}
    </>
  );
};

export default withErrorHandler(AddTodo);

const Form = styled.form`
  margin: 0 2em;
`;
