import { axios } from "@bundled-es-modules/axios";

const instance = axios.create({
  // baseURL: "http://localhost:4000/",
  baseURL: "https://peteknote-be.onrender.com/",
});

export default instance;
