import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { setFormType, signin } from "../store/actions/user";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    if (email && password) {
      const user = {
        email,
        password,
      };
      setPassword("");
      const hasil = await dispatch(signin(user));
      if (hasil) {
        setEmail("");
        navigate("/notes");
      }
    } else {
      Swal.fire("please fill email & password", "", "info");
    }
  };

  const changeFormType = (value) => {
    dispatch(setFormType(value));
  };

  return (
    <>
      <h1>Login</h1>
      <Form onSubmit={(event) => login(event)}>
        <Form.Group controlId="formBasicEmail" className="mb-2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mb-3">
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
          Don t Have Account
        </Button>
      </Form>
    </>
  );
}
