import "./NoteAdd.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Form, Button, Col, Row } from "react-bootstrap";

export default function NoteAdd() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  // eslint-disable-next-line
  const [status, setStatus] = useState("private");

  const history = useHistory();

  const toHome = () => {
    history.push("/notes");
  }

  const createNewNote = (event) => {
    event.preventDefault();
    const newNote = {
      title,
      note,
      tag,
      status,
    };
    console.log(newNote);
  };

  return (
    <div className="container2">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Note - Simple Note App</title>
        <link rel="Note app" href="" />
      </Helmet>

      <h3>
        <b>New Note</b>
      </h3>
      <Form onSubmit={(event) => createNewNote(event)}>
        <Form.Group controlId="formBasicText">
          <Form.Label>Note Title *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Eg: Important notes"
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            onChange={(event) => setNote(event.target.value)}
          />
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="1">
            Tag
          </Form.Label>
          <Col sm="11">
            <Form.Control
              type="text"
              placeholder="Eg: Sports, Account"
              onChange={(event) => setTag(event.target.value)}
            />
          </Col>
        </Form.Group>

        {/* <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}

        <Button className="btn-submit" variant="primary" type="submit">
          Submit
        </Button>
        <Button onClick={() => toHome()} variant="secondary" type="button">
          Back
        </Button>
      </Form>
    </div>
  );
}
