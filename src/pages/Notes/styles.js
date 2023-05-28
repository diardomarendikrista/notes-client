import styled from "styled-components";
import { M_DEVICES_WIDTH } from "config/utils/constant";

export const Wrapper = styled.div`
  position: relative;
  width: 95%;
  margin: auto;

  body {
    /* background-image: url("../assets/img/bg.jpg");
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

  .invisible {
    display: none;
  }

  .sticky {
    position: sticky;
    width: 100%;
    top: 5px;
    z-index: 1;
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
