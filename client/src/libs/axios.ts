import Axios from "axios";
import Router from "next/router";

const axios = Axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === (401 || 419)) {
      Router.push("/auth/login");
      throw "login is needed";
    } else {
      throw { success: false, message: error.message };
    }
  }
);

export default axios;
