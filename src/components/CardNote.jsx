import "./CardNote.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BsXLg, BsPencilSquare } from "react-icons/bs";
import { capitalize } from "helpers/globalFunctions";
import { deleteNoteAsync, setOriginPage } from "store/actions/note";

export default function CardNote({ note }) {
  const { notes } = useSelector((state) => state.note);
  
  const dispatch = useDispatch();
  const history = useHistory();

  const detailNote = (id) => {
    history.push("/notes/show/" + id);
  };

  const editNote = (id) => {
    dispatch(setOriginPage("home"));
    history.push("/notes/edit/" + id);
  };

  const deleteNote = (id) => {
    dispatch(deleteNoteAsync(id, notes));
  };

  return (
    <>
      <Card className="card-note">
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body style={{ padding: "8px 10px" }}>
          <div onClick={() => detailNote(note.id)}>
            <div>
              <p className="text-title text-start">{capitalize(note.title)}</p>
            </div>
            <div className="text-note-wrapper">
              <p className="p-note text-start" dangerouslySetInnerHTML={{ __html: note.note }} />
            </div>
            <div className="text-readmore text-start">
              <p>read more..</p>
            </div>
          </div>
          <div className="btn-div">
            <BsPencilSquare
              onClick={() => editNote(note.id)}
              className="btn-edit me-2"
              size="18px"
            />
            <BsXLg
              onClick={() => deleteNote(note.id)}
              className="btn-delete"
              size="16px"
            />
          </div>
        </Card.Body>
      </Card>
    </>
  );
}
