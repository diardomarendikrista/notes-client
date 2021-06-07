import "./Navbar.css";
import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
import Logo from "../assets/img/logo.png";

export default function Navibar() {
  const [menuHidden, setMenuHidden] = useState(true);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") setMenuHidden(true);
    else setMenuHidden(false);
  }, [location.pathname]);

  const goHome = (event) => {
    event.preventDefault();
    history.push("/notes");
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    history.push("/");
  };

  return (
    <Navbar bg="info" variant="dark" className="navbar">
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
      <Nav className="mr-auto"></Nav>
      <Form inline>
        {" "}
        <NavDropdown
          title="Main Menu"
          id="navbarScrollingDropdown"
          hidden={menuHidden}
        >
          <NavDropdown.Item href="/#">Action</NavDropdown.Item>
          <NavDropdown.Item href="/#">Action 2</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={(event) => logout(event)} href="/#">
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Form>
    </Navbar>
  );
}
