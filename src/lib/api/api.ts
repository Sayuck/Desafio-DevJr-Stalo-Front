import axios from "axios";

import { errorResponseHandler } from "./interceptors";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  errorResponseHandler
);

export { api };
