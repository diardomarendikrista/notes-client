import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
  border: solid 1px blue;
  border-radius: 8px;
`;

export const WrapperMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const UpDownButton = styled.div`
  color: ${({ disabled }) => (disabled ? "gray" : "unset")};
  display: flex;
  align-items: center;
`;

export const DeleteButton = styled.div`
  color: red;
  display: flex;
  align-items: center;
`;
