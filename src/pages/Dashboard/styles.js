import styled from "styled-components";
import { M_DEVICES_WIDTH } from "config/utils/constant";

export const Wrapper = styled.div`
  position: relative;
  width: 95%;
  margin: auto;

  body {
    /* background-image: url("assets/img/bg.jpg");
  background-position: center;
  background-size: cover; */
    background-color: #fff;
  }

  .div-no-note {
    margin-top: 70px;
    color: gray;
  }

  .note {
    min-height: 90vh;
    margin: 30px;
    padding: 20px;
    /* box-shadow: 0 0 10px 2px #B4EBFF; */
  }

  .note-table {
    margin: auto;
  }

  .sticky {
    position: sticky;
    width: 100%;
    top: 5px;
    z-index: 1;
  }

  .search-input {
    border-radius: 0.375rem 0 0 0.375rem;
    border-right: none;
  }

  .search-button {
    border-radius: 0 0.375rem 0.375rem 0;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 12px;

  @media (max-width: ${M_DEVICES_WIDTH}) {
    flex-direction: column;
    gap: 4px;
  }
`;

export const ButtonGroupWrapper = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: ${M_DEVICES_WIDTH}) {
    width: 100%;
  }
`;

export const ButtonWrapper = styled.div`
  @media (max-width: ${M_DEVICES_WIDTH}) {
    width: 50%;
  }
`;

export const SelectWrapper = styled.div`
  width: 150px;

  .grid {
    position: absolute;
    margin-top: 5.5px;
    margin-left: 8px;
  }

  select {
    padding-left: 28px;
  }

  @media (max-width: ${M_DEVICES_WIDTH}) {
    display: none;
  }
`;
