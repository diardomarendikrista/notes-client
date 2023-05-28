import "./Navbar.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Form, NavDropdown } from "react-bootstrap";
import Logo from "../assets/img/logo.png";
import Swal from "sweetalert2";

export default function Navibar() {
  const [menuHidden, setMenuHidden] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") setMenuHidden(true);
    else setMenuHidden(false);
  }, [location.pathname]);

  const goHome = (event) => {
    event.preventDefault();
    navigate("/notes");
  };

  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    navigate("/");
    Swal.fire("Logout successfully", "You are already logged out", "success");
  };

  const about = (event) => {
    event.preventDefault();
    Swal.fire("Petek Note App", "by: Diardo.<br /> ver: 2.00<br /><a href='https://diardokrista.web.app/' target='_blank'>diardokrista.web.app</a>", "info");
  };

  return (
    <Navbar bg="info" variant="dark" className="navbar">
      <Navbar.Brand
        onClick={(event) => goHome(event)}
        href="/#"
        className="ms-lg-4 ms-sm-1"
      >
        <img
          alt="petek note app"
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        Petek Note App
      </Navbar.Brand>
      <Nav className="me-auto"></Nav>
      <Form inline>
        {" "}
        <NavDropdown
          title="Main Menu"
          id="navbarScrollingDropdown"
          hidden={menuHidden}
          className="me-lg-4 me-sm-1"
        >
          <NavDropdown.Item onClick={(event) => about(event)} href="/#">
            About
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={(event) => logout(event)} href="/#">
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Form>
    </Navbar>
  );
}
