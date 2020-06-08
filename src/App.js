import React, { useContext, useEffect, Suspense } from "react";
import { Router, Link, useMatch } from "@reach/router";
import styled, { css, ThemeContext } from "styled-components";
import { Home as Homepage } from "@styled-icons/icomoon";
import Home from "./pages/Home";
import { Context } from "./state";
import actions from "./state/actions";
import { ModalProvider } from "./components/Modal";
import { debounce, isMobileSize } from "./utils";
import Record from "./components/Record";
import Loader from "./components/Loader";

const LazyDetail = React.lazy(() => import("./pages/Detail"));
const LazyAddTodo = React.lazy(() => import("./pages/AddTodo"));

const App = () => {
  const { fontSizes } = useContext(ThemeContext);
  const [{ isMobile }, dispatch] = useContext(Context);
  const isNotHp = Object.is(useMatch("/"), null);

  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      dispatch({ type: actions.SET_WINDOW_SIZE, payload: isMobileSize() });
    }, 100);

    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  });

  return (
    <Main isNotHp={isNotHp}>
      <Container>
        <Header>
          {!isMobile && (
            <Nav>
              <Link to="/">
                <IconHome size={fontSizes.xxlarge} />
              </Link>
            </Nav>
          )}
          <Link to="/">TODOs LIST</Link>
        </Header>

        <ModalProvider>
          <Wrapper>
            <Suspense
              fallback={
                <LoaderWrapper>
                  <Loader loading={true} size={"58px"} />
                </LoaderWrapper>
              }
            >
              <Router>
                <Home path="/" />
                <LazyDetail path="detail/:id" />
                <LazyAddTodo path="add" />
                <NotFound default />
              </Router>
            </Suspense>
          </Wrapper>
          <Record />
        </ModalProvider>
      </Container>
      <Footer>
        <span>Giuseppe Scuglia</span>
      </Footer>
    </Main>
  );
};

export default App;

const Container = styled.div`
  display: inline-grid;
  grid-template-columns: 75vw 25vw;
  grid-template-rows: 10vh 90vh;
  ${(props) => css`
    @media (max-width: ${props.theme.breakpoints.s}px) {
      grid-template-columns: 70vw 30vw;
    }
  `}
`;

const NotFound = () => <div>Sorry, nothing here.</div>;
const IconHome = styled(Homepage)`
  ${(props) => css`
    &:hover {
      color: ${props.theme.colors.primaryDark};
    }
  `}
`;

const Wrapper = styled.div`
  grid-row: 2;
`;

const Nav = styled.nav`
  position: fixed;
  height: 4vh;
  left: 1vw;
`;

const Header = styled.header`
  height: 7vh;
  position: fixed;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => css`
    color: ${props.theme.colors.textLight};
    font-size: ${props.theme.fontSizes.large};
    background: ${props.theme.colors.backgroundSecondary};
    & > a {
      color: ${props.theme.colors.textLight};
      text-decoration: unset;
    }
    & > a:hover {
      color: ${props.theme.colors.primaryLight};
    }
  `}
`;

const Main = styled.main`
  overflow: hidden;
  ${(props) => css`
    height: 100vh;
    background: ${props.theme.colors.backgroundPrimary};
    @media (max-width: ${props.theme.breakpoints.m}px) {
      height: 100vh;
      ${Footer} {
        display: ${({ isNotHp }) => {
          return isNotHp ? "none" : "flex";
        }};
      }

      background: ${({ isNotHp }) => {
        return (
          (isNotHp && props.theme.colors.backgroundSecondary) ||
          props.theme.colors.backgroundPrimary
        );
      }};
    }
  `}
`;

const Footer = styled.footer`
  height: 4vh;
  position: fixed;
  width: 100%;
  bottom: 0;
  display: flex;
  align-items: center;
  ${(props) => css`
    background: ${props.theme.colors.backgroundSecondary};
    & span {
      color: ${props.theme.colors.textLight};
      margin-left: 2vw;
    }
  `}
`;

const LoaderWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
`;
