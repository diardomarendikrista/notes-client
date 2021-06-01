import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "../axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const login = async (event) => {
    event.preventDefault();
    if (email && password) {
      const user = {
        email,
        password,
      };
      setEmail("");
      setPassword("");
      try {
        const { data } = await axios.post("/login", user);
        localStorage.setItem('access_token', data.access_token);
        history.push('/notes');
      } catch (error) {
        console.log(error.response);
        if (!error.response) alert("Sorry, connection to server failed / server down. Please contact administrator");
        else alert(error.response.data.message);
      }
    } else {
      alert("please fill email & password");
    }
  };

  const changeFormType = (value) => {
    dispatch({ type: "formType/setFormType", payload: value });
  };

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={(event) => login(event)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button
          onClick={() => changeFormType("register")}
          variant="secondary"
          type="button"
          className="btn-to-another"
        >
          Don't Have Account
        </Button>
      </Form>
    </>
  );
}
