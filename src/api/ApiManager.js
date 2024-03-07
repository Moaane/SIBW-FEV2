import axios from "axios";

export const MainApi = axios.create({
  baseURL: `http://localhost:3000`,
  responseType: "json",
});
