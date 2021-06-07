import axios from "../../axios";

export function setFormType(payload) {
  return { type: "formType/setFormType", payload };
}

export function signin(user) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/login", user);
      localStorage.setItem("access_token", data.access_token);
      return true;
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alert(error.response.data.message);
    }
  };
}

export function signup(newUser) {
  return async (dispatch) => {
    try {
      // check, is password and repeat password is same?
      await axios.post("/register", newUser);
      // if success.. move to login and clear form
      dispatch(setFormType("login"));
      return true;
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alert(error.response.data.message);
    }
  };
}

function connectionDown() {
  alert(
    "Sorry, connection to server failed / server down. Please contact administrator"
  );
}
