import React, { useContext } from "react";
import styled, { ThemeContext, css, keyframes } from "styled-components";
import Loader from "./Loader";

export const Submit = ({ loading, value }) => {
  const { fontSizes } = useContext(ThemeContext);
  return (
    <>
      <Wrapper>
        <InputSubmit type="submit" value={value} />
        {loading && <Loader loading={loading} size={fontSizes.large} />}
      </Wrapper>
    </>
  );
};

const InputSubmit = styled.input`
  display: inline-block;
  border: none;
  padding: 1rem 2rem;
  margin: 0;
  text-decoration: none;
  text-transform: uppercase;
  ${(props) => css`
    color: ${props.theme.colors.textLight};
    background-color: ${props.theme.colors.primaryBase};
    font-size: ${props.theme.fontSizes.small};
    &:hover,
    &:focus {
      background-color: ${props.theme.colors.primaryDark};
    }
  `}
  cursor: pointer;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  & svg {
    margin-left: -25px;
  }
`;

export const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
