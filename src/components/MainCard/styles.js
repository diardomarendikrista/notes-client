import styled, { css } from "styled-components";
import { M_DEVICES_WIDTH } from "config/utils/constant";

export const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 7px;
  margin-right: 5px;
  min-height: 122px;
  transition: 200ms;
  background-color: #fff;
  border-radius: 7px;
  padding: 8px 10px;
  position: relative;
  box-shadow: 1px 1px 2px 0px rgba(0, 0, 0, 0.3);

  a {
    text-decoration: none;
    color: unset;
  }

  ${({ customWidth }) =>
    customWidth &&
    css`
      width: ${customWidth};
      margin-right: ${({ customWidth }) =>
        customWidth === "100%" ? "0px" : "5px"};
    `}

  :hover {
    background-color: azure;
    /* margin-top: -3px;
    padding-bottom: 3px; */
    transition: 200ms;
    cursor: pointer;
  }

  :active {
    background-color: #fff;
    margin-top: 0px;
    padding-bottom: 0px;
  }

  @media (max-width: ${M_DEVICES_WIDTH}) {
    width: 100%;
    margin-right: 0px;
  }

  .btn-div {
    position: absolute;
    top: 8px;
    right: 12px;
  }

  .btn-delete,
  .btn-edit {
    font-size: 30px;
  }

  .btn-delete:hover,
  .btn-edit:hover {
    cursor: pointer;
  }

  .btn-delete {
    color: #dd1616;
  }

  .btn-delete:hover {
    color: #961111;
  }

  .btn-delete:active {
    color: #dd1616;
  }

  .btn-edit {
    color: #17a2b8;
    margin-right: 5px;
  }

  .btn-edit:hover {
    color: #0e5d6a;
  }

  .btn-edit:active {
    color: #17a2b8;
  }

  .p-note {
    font-size: 16px;
  }

  .text-note-wrapper {
    /* max-height: 50px; */
    display: -webkit-box;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1.36; /* fallback */
    height: 42px; /* fallback */
    -webkit-line-clamp: 2; /* number of lines to show */
    -webkit-box-orient: vertical;
  }

  .text-readmore {
    position: absolute;
    bottom: 10px;
    color: #17a2b8;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.1s;
  }

  .text-readmore:hover {
    font-size: 15px;
    transition: all 0.1s;
  }

  .text-readmore:active {
    font-size: 14.5px;
    transition: all 0.1s;
  }

  .text-title {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: 200ms;
  }

  .text-title:hover {
    font-weight: bold;
  }
`;
