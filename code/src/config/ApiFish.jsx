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

// Fetch all fish data
export const fetchFishData = async () => {
    const response = await api.get("/koi");
    return response.data;
};

// Add a new fish
export const addFish = async (newFish) => {
    const response = await api.post("/koi", newFish);
    return response.data;
};

// Update an existing fish
export const updateFish = async (updatedFish) => {
    const response = await api.put(`/koi/${updatedFish.id}`, updatedFish);
    return response.data;
};

// Delete a fish by ID
export const deleteFish = async (id) => {
    await api.delete(`/koi/${id}`);
};

// Fetch food data for a specific fish by ID
export const fetchFishFoodData = async (id) => {
    const response = await api.get(`/koi/${id}/food`);
    return response.data;
};