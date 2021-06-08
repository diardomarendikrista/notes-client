import "./Note.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BsFillPlusSquareFill } from "react-icons/bs";
import CardNote from "../components/CardNote";
import { fetchNotes } from "../store/actions/note";
import { fetchProfile } from "../store/actions/user";

export default function Note() {
  const profile = useSelector((state) => state.user.profile);
  const notes = useSelector((state) => state.note.notes);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // check local storage
    if (!localStorage.getItem("access_token")) {
      history.push("/");
    } else {
      // load notes
      dispatch(fetchNotes());
      dispatch(fetchProfile());
    }
    // eslint-disable-next-line
  }, []);

  const addNote = () => {
    history.push('/notes/add');
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Note - Simple Note App</title>
        <link rel="Note app" href="" />
      </Helmet>

      <div className="note-container">
        <div>
          <h3 className="title">{profile.name}'s note</h3>
        </div>
        <div className="add-btn">
          <button onClick={() => addNote()} className="btn btn-primary"><BsFillPlusSquareFill /> new note</button>
        </div>
        <div className="note-list">
          <center>
            {
              notes.map(note => (
                <CardNote
                  note={note}
                  key={note.id}
                />
              ))
            }
          </center>
        </div>
      </div>
    </div>
  );
}
