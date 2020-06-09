import React from "react";
import styled, { css } from "styled-components";

const TodoWrapper = styled.div`
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  padding: 2em;
  width: 35vw;
  margin: 1em auto;
  ${(props) => css`
    background: ${props.theme.colors.textLight};
    color: ${props.theme.colors.primaryDark};
    @media (max-width: ${props.theme.breakpoints.l}px) {
      width: 40vw;
    }
  `}
`;

export default TodoWrapper;
