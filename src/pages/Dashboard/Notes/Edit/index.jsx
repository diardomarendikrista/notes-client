import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Form, Button, Col, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

import { updateNoteAsync, fetchNoteAsync } from "store/actions/note";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function NoteAdd() {
  const { id } = useParams();

  const { originPage, loadingDetail, notes } = useSelector((state) => state.note);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  // eslint-disable-next-line
  const [status, setStatus] = useState("private");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEditNote();
    // eslint-disable-next-line
  }, []);

  const fetchEditNote = async () => {
    const dataNote = await dispatch(fetchNoteAsync(id));
    setTitle(dataNote.title);
    setNote(dataNote.note);
    setTag(dataNote.tag);
    setStatus(dataNote.status);
  };

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
    await dispatch(updateNoteAsync(updateNote, notes));
    if (originPage === "home") navigate("/dashboard");
    if (originPage === "detail") navigate("/notes/show/" + updateNote.id);
  };

  const toHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="container2">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Note - Petek Note App</title>
        <link rel="Note app" href="" />
      </Helmet>

      <h3>
        <b>Edit Note</b>
      </h3>
      <Form onSubmit={(event) => updateNote(event)}>
        <Form.Group controlId="formBasicText" className="mb-2">
          <Form.Label>Note Title *</Form.Label>
          {!loadingDetail ? (
            <Form.Control
              type="text"
              placeholder="Eg: Important notes"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          ) : (
            <Skeleton height={34} />
          )}
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
          <div className={loadingDetail ? "invisible" : ""}>
            <CKEditor
              editor={ClassicEditor}
              data={note}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
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
          {loadingDetail && <Skeleton height={235} />}
        </div>

        <Form.Group as={Row} controlId="formPlaintextPassword" className="mb-4">
          <Form.Label column sm="1">
            Tag
          </Form.Label>
          <Col sm="11">
            {!loadingDetail ? (
              <Form.Control
                type="text"
                placeholder="Eg: Sports, Account"
                value={tag}
                onChange={(event) => setTag(event.target.value)}
              />
            ) : (
              <Skeleton height={34} />
            )}
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
