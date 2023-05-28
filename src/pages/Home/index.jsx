import "./styles.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import Login from "pages/Login";
import Register from "pages/Register";
import Loading from "components/Loader/Loader";

export default function Home() {
  const formType = useSelector((state) => state.user.formType);
  const [firstLoad, setFirstLoad] = useState(true);

  const location = useLocation();

  console.log(location, "location");

  useEffect(() => {
    // check local storage
    if (localStorage.getItem("access_token")) {
      window.location.replace("/notes");
    } else {
      setFirstLoad(false);
    }
  }, []);

  return (
    <Container fluid>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Petek Note App</title>
        <link rel="Note app" href="" />
      </Helmet>

      {firstLoad ? (
        <Loading center />
      ) : (
        <div className="home">
          <Row>
            <Col lg>
              <div className="d-flex align-items-center mb-2">
                <div
                  className="me-1"
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    width: "55px",
                  }}
                >
                  <img
                    src="https://i.imgur.com/wS1NqtG.jpg"
                    alt="petek"
                    width="100%"
                  />
                </div>
                <h1>Petek Note app</h1>
              </div>
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
            <Col lg>{formType === "login" ? <Login /> : <Register />}</Col>
          </Row>
        </div>
      )}
    </Container>
  );
}
