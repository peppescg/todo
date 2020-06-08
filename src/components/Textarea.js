import React from "react";
import styled, { css } from "styled-components";

const Textarea = ({ id, placeholder, rows = 5, value, onChange }) => (
  <TextareaStyled
    id={id}
    rows={rows}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
);

export default Textarea;

const TextareaStyled = styled.textarea`
  display: block;
  border-radius: 3px;
  margin-top: 1em;
  width: 100%;
  border: none;
  ${(props) => css`
    border: 1px solid ${props.theme.colors.primaryLight};
    color: ${props.theme.colors.primaryDark};
    &:hover,
    &:focus {
      border: 1px solid ${props.theme.colors.primaryDark};
    }
    &::placeholder {
      color: ${props.theme.colors.primaryDark};
    }
  `}
`;
