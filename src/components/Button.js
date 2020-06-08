import React, { useContext } from "react";
import styled, { ThemeContext, css } from "styled-components";
import { VideoCamera, Checkmark } from "@styled-icons/icomoon";

const Button = ({ value, type, isActive, onClick }) => {
  const { fontSizes } = useContext(ThemeContext);

  return (
    <ButtonStyled
      className="button"
      isActive={isActive}
      type={type}
      onClick={onClick}
    >
      {value}

      {type === "default" && isActive === "record" && (
        <Recording size={fontSizes.large} />
      )}
      {type === "success" && isActive === "play" && (
        <Check size={fontSizes.large} />
      )}
      {type === "error" && isActive === "clear" && (
        <Check size={fontSizes.large} />
      )}
      {type === "warning" && isActive === "stop" && (
        <Check size={fontSizes.large} />
      )}
    </ButtonStyled>
  );
};

export default Button;

const ButtonStyled = styled.button`
  height: 10vh;
  width: 14vw;
  cursor: pointer;
  outline: unset;
  ${(props) => css`
    &:hover {
      border-color: ${props.theme.colors.primaryDark};
    }
    color: ${props.theme.colors.textBase};
    background: ${({ type }) => {
      switch (type) {
        case "error":
          return props.theme.colors.errorLight;
        case "success":
          return props.theme.colors.successLight;
        case "warning":
          return props.theme.colors.warningLight;
        default:
          return props.theme.colors.primaryLight;
      }
    }};
  `};
`;

const Recording = styled(VideoCamera)`
  margin-left: 5px;
  ${(props) => css`
    color: ${props.theme.colors.errorBase};
  `}
`;

const Check = styled(Checkmark)`
  margin-left: 5px;
  ${(props) => css`
    color: ${props.theme.colors.textBase};
  `}
`;
