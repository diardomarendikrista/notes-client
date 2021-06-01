import "./Home.css";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import Login from "./Login";
import Register from "./Register";

export default function Home() {
  const formType = useSelector((state) => state.login.formType);
  const history = useHistory();

  useEffect(() => {
    // check local storage
    if (localStorage.getItem("access_token")) {
      history.push("/notes");
    }
  }, [history]);

  return (
    <Container fluid>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Simple Note App</title>
        <link rel="Note app" href="" />
      </Helmet>

      <div className="home">
        <Row>
          <Col>
            <h1>Simple Note app</h1>
            <p>
              Register with easy-peasy way to get into our services. Our apps
              already encrypted with safe way and will not leak to another
              party. (yeah this is using JWT and Bcrypt)
            </p>
            <p>
              You can create, edit and delete your Note (okay, this is another
              fc*in CRUD app). honestly this is my Note version that I remake
              from my past project using Native PHP
            </p>
            <p>Hope you enjoy your day with Simple Note!!</p>
          </Col>
          <Col>{formType === "login" ? <Login /> : <Register />}</Col>
        </Row>
      </div>
    </Container>
  );
}
