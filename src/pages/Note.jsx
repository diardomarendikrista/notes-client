import "./Note.css";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container, Button } from "react-bootstrap";
import Navbar from "../components/Navbar";
import axios from "../axios";

export default function Note() {
  const history = useHistory();

  useEffect(() => {
    // check local storage
    if (!localStorage.getItem("access_token")) {
      history.push("/");
    } else {
      // load notes
      fetchNote();
    }
    // eslint-disable-next-line
  }, []);

  const fetchNote = async () => {
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const { data } = await axios.get("/notes", { headers });
      console.log(data);
    } catch (error) {
      if (!error.response) alert("Sorry, connection to server failed / server down. Please contact administrator");
      else console.log(error.response);
    }
  };

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Note - Simple Note App</title>
        <link rel="Note app" href="" />
      </Helmet>

      <Navbar />

      <Container>
        <div>
          <h1>Home</h1>
        </div>
        <div></div>
        <Button variant="info" onClick={() => logout()}>
          Logout
        </Button>
      </Container>
    </div>
  );
}
