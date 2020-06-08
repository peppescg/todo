import React, { useRef, useContext, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styled, { ThemeContext, keyframes, css } from "styled-components";
import { ArrowLeft2 } from "@styled-icons/icomoon";

const Context = React.createContext(null);

export const ModalProvider = ({ children }) => {
  const modalRef = useRef(null);
  const [context, setContext] = useState(null);

  // make sure re-render is triggered after initial
  // render so that modalRef exists
  useEffect(() => {
    setContext(modalRef.current);
  }, []);

  return (
    <>
      <Context.Provider value={context}>{children}</Context.Provider>
      <div ref={modalRef} />
    </>
  );
};

export const Modal = ({ children, onClose }) => {
  const modalNode = useContext(Context);
  const { fontSizes } = useContext(ThemeContext);
  const overlayRef = useRef(null);

  const handleClick = (e) => {
    if (e.target instanceof Node && overlayRef.current?.isEqualNode(e.target)) {
      onClose();
      return;
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return modalNode
    ? ReactDOM.createPortal(
        <>
          <Overlay ref={overlayRef} data-testid="overlay" />
          <Dialog>
            <header>
              <Back size={fontSizes.xxlarge} onClick={() => onClose()} />
            </header>
            {children}
          </Dialog>
        </>,
        modalNode
      )
    : null;
};

const fadeIn = keyframes`from { opacity: 0; }`;

const Overlay = styled.div`
  animation: ${fadeIn} 200ms ease-out;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;

const Dialog = styled.div`
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(1);
  z-index: 2;
  width: 100%;
  height: 100%;
  opacity: 1;
  padding: 2rem;
  ${(props) => css`
    background: ${props.theme.colors.backgroundSecondary};
  `};
  animation: modalAnimation 0.3s;
  @keyframes modalAnimation {
    from {
      top: 100%;
      opacity: 0;
    }
    to {
      top: 50%;
      opacity: 1;
    }
  }
`;

const Back = styled(ArrowLeft2)`
  margin: 1em;
  cursor: pointer;
  ${(props) => css`
    color: ${props.theme.colors.primaryLight};
  `};
`;
