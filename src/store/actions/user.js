import axios from "../../axios";
import Swal from "sweetalert2";

export function setFormType(payload) {
  return { type: "formType/setFormType", payload };
}

export function setProfile(payload) {
  return { type: "profile/setProfile", payload };
}

export function setLoadingGlobal(payload) {
  return { type: "loadingGlobal/setLoadingGlobal", payload };
}

export function fetchProfile() {
  return async (dispatch) => {
    try {
      dispatch(setLoadingGlobal(true));
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const { data } = await axios.get("/user", { headers });
      dispatch(setProfile(data.user));
    } catch (error) {
      if (!error.response) connectionDown();
      else console.log(error.response);
    } finally {
      dispatch(setLoadingGlobal(false));
    }
  };
}

export function signin(user) {
  return async (dispatch) => {
    try {
      Swal.fire("Processing . . .", "", "");
      const { data } = await axios.post("/login", user);
      localStorage.setItem("access_token", data.access_token);

      const name = user?.email?.split("@")[0]?.split(".")[0]?.split("_")[0];
      Swal.fire("Welcome", `Hello, ${name}`, "success");
      return true;
    } catch (error) {
      // console.log(error);
      if (!error.response) connectionDown();
      else Swal.fire(error.response.data.message, "", "error");
    }
  };
}

export function signup(newUser) {
  return async (dispatch) => {
    try {
      // check, is password and repeat password is same?
      const { data } = await axios.post("/register", newUser);
      // if success.. move to login and clear form
      // console.log(data, "data");
      Swal.fire(
        "Registration Success",
        `You can now login with email: <b>${data.data.email}</b>`,
        "success"
      );
      dispatch(setFormType("login"));
      return true;
    } catch (error) {
      // console.log(error.response);
      if (!error.response) connectionDown();
      else Swal.fire(error.response.data.message, "", "error");
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
