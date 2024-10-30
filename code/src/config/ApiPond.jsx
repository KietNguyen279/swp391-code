import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "https://api-koicare-5f7e5d44b191.herokuapp.com/",
});

// Interceptor to handle the token before making API calls
const handleBefore = (config) => {
  const token = localStorage.getItem("token")?.replaceAll('"', "");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
};

// Error handling for requests
const handleError = (error) => {
  console.error(error);
  return Promise.reject(error);
};

// Apply the interceptor
api.interceptors.request.use(handleBefore, handleError);

// Fetch all pond data
export const fetchPondData = async () => {
  const response = await api.get("/pond");
  return response.data;
};

// Add a new pond
export const addPond = async (newPond) => {
  const response = await api.post("/pond", newPond);
  return response.data;
};

// Update an existing pond
export const updatePond = async (updatedPond) => {
  const response = await api.put(`/pond/${updatedPond.id}`, updatedPond);
  return response.data;
};

// Delete a pond by ID
export const deletePond = async (id) => {
  await api.delete(`/pond/${id}`);
};
