import axios from "../../axios";
import Swal from "sweetalert2";

export function setNotes(payload) {
  return { type: "notes/setNotes", payload };
}

export function setOriginPage(payload) {
  return { type: "originPage/setOriginPage", payload };
}

export function setLoadingNote(payload) {
  return { type: "loadingNote/setLoadingNote", payload };
}

export function setLoadingDetail(payload) {
  return { type: "loadingDetail/setLoadingDetail", payload };
}

export function fetchNotes() {
  return async (dispatch) => {
    try {
      dispatch(setLoadingNote(true));
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const { data } = await axios.get("/notes", { headers });
      // console.log(data);
      dispatch(setNotes(data));
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alert(error.response.data.message);
    } finally {
      dispatch(setLoadingNote(false));
    }
  };
}

export function fetchNoteAsync(id) {
  return async (dispatch) => {
    try {
      dispatch(setLoadingDetail(true));
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const { data } = await axios.get("/notes/" + id, { headers });
      return data;
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alert(error.response.data.message);
    } finally {
      dispatch(setLoadingDetail(false));
    }
  };
}

export function searchNoteAsync(keyword) {
  return async (dispatch) => {
    try {
      dispatch(setLoadingNote(true));
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const { data } = await axios.get("/notes/search/" + keyword, { headers });
      // console.log(data);
      dispatch(setNotes(data.data));
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alert(error.response.data.message);
    } finally {
      dispatch(setLoadingNote(false));
    }
  };
}

export function newNoteAsync(newNote) {
  return async (dispatch) => {
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const { data } = await axios.post("/notes", newNote, { headers });
      Swal.fire("Success!", `note ${data.title} has been created!`, "success");
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alert(error.response.data.message);
    }
  };
}

export function updateNoteAsync(updateNote) {
  return async (dispatch) => {
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const { data } = await axios.put("/notes/" + updateNote.id, updateNote, {
        headers,
      });
      // console.log(data);
      Swal.fire(
        "Success!",
        `note ${data.data.title} has been edited!`,
        "success"
      );
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alert(error.response.data.message);
    }
  };
}

export function deleteNoteAsync(id) {
  return (dispatch) => {
    try {
      // delete confirmation
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          // if confirmed, then delete.
          const headers = {
            access_token: localStorage.access_token,
          };
          const { data } = await axios.delete("/notes/" + id, { headers });
          console.log(id);
          if (data) {
            dispatch(fetchNotes());
            Swal.fire("Deleted!", "Noted already deleted.", "success");
          }
        }
      });
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alert(error.response.data.message);
    }
  };
}

function connectionDown() {
  Swal.fire(
    "Information!",
    "Sorry, connection to server failed / server down. Please contact administrator.",
    "warning"
  );
}
