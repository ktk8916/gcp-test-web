import axios from "axios";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" && "http://localhost:8080";

const api = async (url, method, data) => {
  const response = await axios({
    url,
    method,
    data,
  });

  return response;
};

export { api };
