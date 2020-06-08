import React from "react";
import styled, { css } from "styled-components";

export const InputText = ({
  id,
  className,
  placeholder,
  value,
  onChange,
  isError = false,
}) => (
  <InputTextStyled
    id={id}
    type="text"
    placeholder={placeholder}
    value={value}
    isError={isError}
    className={className}
    onChange={onChange}
  />
);
export const InputWrapper = styled.div`
  padding-top: 1em;
`;

const InputTextStyled = styled.input`
  outline: none;
  border: none;
  overflow: visible;
  margin: 0;
  display: block;
  width: 100%;
  background: transparent;
  line-height: 1.2;
  height: 40px;

  ${(props) => css`
    /* color: ${props.theme.colors.primaryDark}; */
    border-bottom: 1px solid ${props.theme.colors.primaryLight};
    font-size: ${props.theme.fontSizes.large};
    &::placeholder {
      color: ${({ isError }) =>
        (isError && props.theme.colors.errorDark) ||
        props.theme.colors.primaryDark};
    }

    &:hover {
      border-bottom: 1px solid ${props.theme.colors.primaryDark};
    }
    @media (max-width: ${props.theme.breakpoints.m}px) {
      &::placeholder {
        color: ${({ isError }) =>
          (isError && props.theme.colors.errorLight) ||
          props.theme.colors.textLight};
      }
    }

    &.input-text-mobile {
      background-color: transparent;
      font-size: ${props.theme.fontSizes.medium};
      color: ${props.theme.colors.textLight};
      border-bottom: 1px solid ${props.theme.colors.primaryLight};
      width: 80vw;
    }
  `}
`;
