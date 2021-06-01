import React from "react";
import { useHistory } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import Logo from "../assets/img/logo.png";

export default function Navibar() {
  const history = useHistory();

  const goHome = (event) => {
    event.preventDefault();
    history.push('/notes');
  };

  return (
    <Navbar bg="info" variant="dark">
      <Container>
        <Navbar.Brand onClick={(event) => goHome(event)} href="/#">
          <img
            alt=""
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Simple Note App
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
