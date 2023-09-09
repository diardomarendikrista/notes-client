import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
  border: solid 1px blue;
  border-radius: 4px;
  gap: 4px;
`;

export const WrapperMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

export const UpDownButton = styled.div`
  color: ${({ disabled }) => (disabled ? "gray" : "unset")};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const DeleteButton = styled.div`
  color: red;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
