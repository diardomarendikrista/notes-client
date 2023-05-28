import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  bottom: 10px;
  left: 10px;

  ${({ variant }) =>
    variant === "home" &&
    css`
      top: 10px;
      right: 10px;
      left: unset;
      bottom: unset;
    `}
`;
