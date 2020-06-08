import React from "react";
import styled, { css } from "styled-components";
import { CheckboxUnchecked, CheckboxChecked } from "@styled-icons/icomoon";

export const Checkbox = ({ className, checked = false, onCheck, size }) => {
  return (
    <>
      {checked ? (
        <CheckedStyled className={className} size={size} onClick={onCheck} />
      ) : (
        <UncheckedStyled className={className} size={size} onClick={onCheck} />
      )}
    </>
  );
};

export const CheckboxWrapper = styled.div`
  margin-top: 1em;
  display: flex;
  justify-content: space-between;
  width: 5em;
  align-items: center;
`;

const CheckedStyled = styled(CheckboxChecked)`
  cursor: pointer;
  ${(props) => css`
    color: ${props.theme.colors.primaryLight};
    &:hover {
      color: ${props.theme.colors.primaryDark};
    }
    &.modal {
      color: ${props.theme.colors.textLight};
    }
  `}
`;

const UncheckedStyled = styled(CheckboxUnchecked)`
  cursor: pointer;
  ${(props) => css`
    color: ${props.theme.colors.primaryLight};
    &:hover {
      color: ${props.theme.colors.primaryDark};
    }
    &.modal {
      color: ${props.theme.colors.textLight};
    }
  `}
`;
