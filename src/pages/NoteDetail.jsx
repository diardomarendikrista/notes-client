import "./NoteAdd.css";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "react-bootstrap";
import { fetchNoteAsync, setOriginPage } from "../store/actions/note";
import capitalize from "../helpers/capitalize";

export default function NoteAdd() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [tag, setTag] = useState("");
  // eslint-disable-next-line
  const [status, setStatus] = useState("private");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchNote();
    // eslint-disable-next-line
  }, []);

  const fetchNote = async () => {
    const data = await dispatch(fetchNoteAsync(id));
    setTitle(data.title);
    setNote(data.note);
    setTag(data.tag);
    setStatus(data.status);
  };

  const editNote = (id) => {
    dispatch(setOriginPage("detail"));
    history.push("/notes/edit/" + id);
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
        <b>{capitalize(title)}</b>
      </h3>
      <p>
        {note.split("\n").map(function (item, idx) {
          return (
            <span key={idx}>
              {item}
              <br />
            </span>
          );
        })}
      </p>
      <p>tag : {tag}</p>
      <Button
        onClick={() => editNote(id)}
        className="btn-submit"
        variant="info"
        type="submit"
      >
        Edit
      </Button>
      <Button onClick={() => toHome()} variant="secondary" type="button">
        Back
      </Button>
    </div>
  );
}