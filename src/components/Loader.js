import React from "react";
import styled, { css, keyframes } from "styled-components";
import { Spinner2 } from "@styled-icons/icomoon";

const Loader = ({ loading, size }) => {
  return <>{loading && <Spinner size={size} />}</>;
};

export default Loader;

const rotateSpinner = keyframes`
from { transform: rotate(0deg); }
to {transform: rotate(360deg); }
`;

const Spinner = styled(Spinner2)`
  ${(props) => css`
    color: ${props.theme.colors.warningLight};
  `}
  & {
    animation: ${rotateSpinner} linear 1s infinite;
  }
`;
