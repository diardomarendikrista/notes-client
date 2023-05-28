import "./styles.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Form, Button, Col, Row } from "react-bootstrap";

import { newNoteAsync } from "store/actions/note";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function NoteAdd() {
  const { notes } = useSelector((state) => state.note);

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  // eslint-disable-next-line
  const [status, setStatus] = useState("private");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/notes");
  };

  const createNewNote = async (event) => {
    event.preventDefault();
    const newNote = {
      title,
      note,
      tag,
      status,
    };
    // console.log(newNote);
    await dispatch(newNoteAsync(newNote, notes));
    navigate("/notes");
  };

  return (
    <div className="container2">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Add Note - Petek Note App</title>
        <link rel="Note app" href="" />
      </Helmet>

      <h3>
        <b>New Note</b>
      </h3>
      <Form onSubmit={(event) => createNewNote(event)}>
        <Form.Group controlId="formBasicText" className="mb-2">
          <Form.Label>Note Title *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Eg: Important notes"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Group>

        {/* <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={10}
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </Form.Group> */}

        <div className="mb-2">
          <Form.Label>Notes</Form.Label>
          <CKEditor
            editor={ClassicEditor}
            data={note}
            onReady={(editor) => {
              // You can store the "editor" and use when it is needed.
              // console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              setNote(data);
              // console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              // console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              // console.log("Focus.", editor);
            }}
          />
        </div>

        <Form.Group as={Row} controlId="formPlaintextPassword" className="mb-4">
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
