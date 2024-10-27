import axios from "axios";

const api = axios.create({
  baseURL: "https://api-koicare-5f7e5d44b191.herokuapp.com/",
});
// làm 1 hành động gì đó trước khi call api
const handleBefore = (config) => {
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  config.headers["Authorization"] = `Bearer ${token}`;
  return config;
};

const handleError = (error) => {
  console.log(error);
};

api.interceptors.request.use(handleBefore, handleError);

export default api;
