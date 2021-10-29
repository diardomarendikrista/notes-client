import styled from "styled-components";

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
