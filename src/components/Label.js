import React from "react";
import styled, { css } from "styled-components";

export const Label = styled.span`
  ${(props) => css`
    color: ${props.theme.colors.textDisabled};
    font-size: ${props.theme.fontSizes.small};
  `}
`;
