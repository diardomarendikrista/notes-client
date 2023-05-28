import styled, { css } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  min-height: 80vh;

  ${({ center }) =>
    center &&
    css`
      align-items: center;
    `}
`;
