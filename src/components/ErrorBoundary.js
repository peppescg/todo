import React from "react";
import styled, { css } from "styled-components";

export default function withErrorHandler(Component) {
  class WithErrorHandler extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        hasError: false,
      };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return <BackToHome>Something went wrong.</BackToHome>;
      }

      return <Component {...this.props} />;
    }
  }

  return WithErrorHandler;
}

const BackToHome = styled.h1`
  ${(props) => css`
    & > a:hover {
      color: ${props.theme.colors.primaryDark};
    }
  `}
`;
