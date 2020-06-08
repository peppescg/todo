import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import styled, { ThemeContext, css } from "styled-components";
import { v1 as uuidv1 } from "uuid";
import { Context } from "../state";
import actions from "../state/actions";
import { Checkbox, CheckboxWrapper } from "./Checkbox";
import { Submit, SubmitWrapper } from "./Submit";
import { InputText, InputWrapper } from "./InputText";
import { Label } from "./Label";
import withErrorHandler from "../components/ErrorBoundary";
import { Modal } from "./Modal";

const AddTodoMobile = () => {
  const { fontSizes } = useContext(ThemeContext);
  const [{ loading }, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isDone, setStatus] = useState(false);
  const [isModalOpen, setModal] = useState(true);
  const [errorName, setErrorName] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      setErrorName(true);
      return;
    }
    dispatch({ type: actions.SET_LOADING, payload: true });
    // simulate async action for trigger spinner
    setTimeout(() => {
      dispatch({
        type: actions.ADD_TODO,
        payload: { id: uuidv1(), isDone, description, name },
      });
      dispatch({ type: actions.SET_LOADING, payload: false });
      navigate("/");
    }, 1000);
  }

  const onCloseHandler = () => {
    setModal(false);
    navigate("/");
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={() => onCloseHandler()}>
          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <ModalLabel>Name</ModalLabel>
              <InputText
                id="name"
                type="text"
                isError={errorName}
                placeholder="Insert a title"
                value={name}
                className="input-text-mobile"
                onChange={(e) => setName(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <ModalLabel>Description</ModalLabel>
              <InputText
                id="description"
                type="text"
                placeholder="Insert a description..."
                value={description}
                className="input-text-mobile"
                onChange={(e) => setDescription(e.target.value)}
              />
              <CheckboxWrapper>
                <ModalLabel>Status</ModalLabel>
                <Checkbox
                  checked={isDone}
                  size={fontSizes.large}
                  className="modal"
                  onCheck={() => setStatus(!isDone)}
                />
              </CheckboxWrapper>
            </InputWrapper>
            <SubmitWrapper>
              <Submit type="submit" value="Update" loading={loading} />
            </SubmitWrapper>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default withErrorHandler(AddTodoMobile);

const Form = styled.form`
  margin: 6em 2em;
  ${InputWrapper} {
    margin: 2em 0;
  }

  ${CheckboxWrapper} {
    margin-top: 3em;
  }

  ${SubmitWrapper} {
    margin-top: 5em;
  }
`;

const ModalLabel = styled(Label)`
  ${(props) => css`
    color: ${props.theme.colors.primaryBase};
  `}
`;
