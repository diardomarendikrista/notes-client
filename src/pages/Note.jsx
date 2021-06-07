import "./Note.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BsFillPlusSquareFill } from "react-icons/bs";
import CardNote from "../components/CardNote";
import axios from "../axios";

export default function Note() {
  const profile = useSelector((state) => state.login.profile);
  const notes = useSelector((state) => state.note.notes);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    // check local storage
    if (!localStorage.getItem("access_token")) {
      history.push("/");
    } else {
      // load notes
      fetchNote();
      fetchProfile();
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
      dispatch({ type: "notes/setNotes", payload: data });
    } catch (error) {
      if (!error.response)
        alert(
          "Sorry, connection to server failed / server down. Please contact administrator"
        );
      else console.log(error.response);
    }
  };

  const fetchProfile = async () => {
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const { data } = await axios.get("/user", { headers });
      dispatch({ type: "profile/setProfile", payload: data.user });
    } catch (error) {
      if (!error.response)
        alert(
          "Sorry, connection to server failed / server down. Please contact administrator"
        );
      else console.log(error.response);
    }
  };

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
