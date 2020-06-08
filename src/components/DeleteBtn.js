import styled, { ThemeContext, css } from "styled-components";

export const DeleteBtn = styled.button`
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

export const BtnGroups = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  ${(props) => css`
    & button {
      background-color: ${props.theme.colors.errorBase};
    }
    & button:hover {
      background-color: ${props.theme.colors.errorDark};
    }
  `}
`;
