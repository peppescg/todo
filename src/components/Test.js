import React from "react";
import { Link } from "@reach/router";
import styled, { css } from "styled-components";

export default function withErrorHandler(
  Component,
  CustomErrorComponent = null
) {
  class WithErrorHandler extends React.Component {
    constructor(props) {
      super(props);

      // Construct the initial state
      this.state = {
        hasError: false,
      };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        if (CustomErrorComponent) {
          return (
            <CustomErrorComponent
              {...this.props}
              error={error}
              errorInfo={errorInfo}
            />
          );
        } else {
          return(
            <h1>Something went wrong.</h1>
            <BackToHome>
              <Link to="/">Back to home</Link>
            </BackToHome>)
          
        }
      }

      return <Component {...this.props} />;
    }
  }

  return WithErrorHandler;
}

const BackToHome = styled(Link)`
  ${(props) => css`
    & > a:hover {
      color: ${props.theme.colors.primaryDark};
    }
  `}
`;
