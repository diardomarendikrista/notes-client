import axios from "axios";

const instance = axios.create({
  // baseURL: "http://139.228.174.42:4000/",
  // baseURL: "http://localhost:4000/",
  baseURL: "https://peteknote-be.onrender.com/",
});

export default instance;
