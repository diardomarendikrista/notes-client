import axios from "../../axios";
import Swal from "sweetalert2";

export function setNotes(payload) {
  return { type: "notes/setNotes", payload };
}

export function fetchNotes() {
  return async (dispatch) => {
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const { data } = await axios.get("/notes", { headers });
      // console.log(data);
      dispatch(setNotes(data));
    } catch (error) {
      if (!error.response)
        alert(
          "Sorry, connection to server failed / server down. Please contact administrator"
        );
      else console.log(error.response);
    }
  };
}

export function newNotes(newNote) {
  return async (dispatch) => {
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const { data } = await axios.post("/notes", newNote, { headers });
      Swal.fire(
        'Success!',
        `note ${data.title} has been created!`,
        'success'
      )
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alert(error.response.data.message);
    }
  };
}

export function deleteNote(id) {
  return async (dispatch) => {
    try {
      // codeh dimari
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alert(error.response.data.message);
    }
  }
}

function connectionDown() {
  Swal.fire(
    'Information!',
    'Sorry, connection to server failed / server down. Please contact administrator.',
    'warning'
  )
}
