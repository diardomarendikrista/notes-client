import "./NoteAdd.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Form, Button, Col, Row } from "react-bootstrap";
import { updateNoteAsync, fetchNoteAsync } from "../store/actions/note";

export default function NoteAdd() {
  const { id } = useParams();

  const originPage = useSelector(state => state.note.originPage);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  // eslint-disable-next-line
  const [status, setStatus] = useState("private");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchEditNote();
    // eslint-disable-next-line
  }, []);

  const fetchEditNote = async () => {
    const data = await dispatch(fetchNoteAsync(id));
    setTitle(data.title);
    setNote(data.note);
    setTag(data.tag);
    setStatus(data.status);
  }


  const updateNote = async (event) => {
    event.preventDefault();
    const updateNote = {
      id,
      title,
      note,
      tag,
      status,
    };
    // console.log(updateNote);
    await dispatch(updateNoteAsync(updateNote));
    if (originPage === "home") history.push("/notes");
    if (originPage === "detail") history.push("/notes/show/" + updateNote.id);
  };

  const toHome = () => {
    history.push("/notes");
  };

  return (
    <div className="container2">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Note - Simple Note App</title>
        <link rel="Note app" href="" />
      </Helmet>

      <h3>
        <b>Edit Note</b>
      </h3>
      <Form onSubmit={(event) => updateNote(event)}>
        <Form.Group controlId="formBasicText">
          <Form.Label>Note Title *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Eg: Important notes"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={note}
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
              value={tag}
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
