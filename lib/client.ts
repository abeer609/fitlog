import axios from "axios";

const client = axios.create({
  baseURL: "https://api.api-store.workers.dev/api",
});

export default client;
