import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import styled, { ThemeContext, css } from "styled-components";
import { Context } from "../state";
import actions from "../state/actions";
import { Checkbox, CheckboxWrapper } from "./Checkbox";
import { Submit, SubmitWrapper } from "./Submit";
import { InputText, InputWrapper } from "./InputText";
import { Label } from "./Label";
import { formatDate } from "../utils";
import withErrorHandler from "../components/ErrorBoundary";
import { Modal } from "./Modal";
import { DeleteBtn, BtnGroups } from "../components/DeleteBtn";

const DetailMobile = ({ id, onClose }) => {
  const { fontSizes } = useContext(ThemeContext);
  const [{ loading, todos }, dispatch] = useContext(Context);
  const navigate = useNavigate();
  const todo = todos.find((todo) => todo.id === id);
  const [name, setName] = useState((todo && todo.name) || "");
  const [description, setDescription] = useState(
    (todo && todo.description) || ""
  );
  const [isDone, setStatus] = useState((todo && todo.isDone) || false);
  const [isModalOpen, setModal] = useState(true);

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
      setModal(false);
      navigate("/");
    }, 1000);
  }

  const onCloseHandler = () => {
    setModal(false);
    navigate("/");
  };

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
      {isModalOpen && (
        <Modal onClose={() => onCloseHandler()}>
          <Form onSubmit={handleSubmit}>
            <ModalLabel>Creatation date</ModalLabel>
            <CreationDate>{todo && formatDate(todo.creationDate)}</CreationDate>
            <InputWrapper>
              <ModalLabel>Name</ModalLabel>
              <InputText
                id="name"
                type="text"
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

            <BtnGroups>
              <DeleteBtn onClick={onDeleteHandler}>Delete</DeleteBtn>
              <SubmitWrapper>
                <Submit type="submit" value="Update" loading={loading} />
              </SubmitWrapper>
            </BtnGroups>
          </Form>
        </Modal>
      )}
    </>
  );
};

export default withErrorHandler(DetailMobile);

const Form = styled.form`
  margin: 6em 2em;
  ${InputWrapper} {
    margin: 2em 0;
  }

  ${CheckboxWrapper} {
    margin-top: 3em;
  }
`;

const ModalLabel = styled(Label)`
  ${(props) => css`
    color: ${props.theme.colors.primaryBase};
  `}
`;

const CreationDate = styled.p`
  padding: 0;
  margin: 1em 0;

  ${(props) => css`
    color: ${props.theme.colors.textLight};
  `}
`;
