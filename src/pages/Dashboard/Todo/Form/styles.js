import styled from "styled-components";

export const Wrapper = styled.div`
  .input-todo {
    input {
      border-radius: 0.375rem 0 0 0.375rem;
    }
  }
`;

export const TodoCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ButtonAddWrapper = styled.div`
  white-space: nowrap;

  button {
    border-radius: 0 0.375rem 0.375rem 0;
  }
`;
