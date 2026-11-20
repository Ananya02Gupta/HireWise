
import axios from "axios";

const API = axios.create({
  baseURL: "https://hirewise-sju9.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
