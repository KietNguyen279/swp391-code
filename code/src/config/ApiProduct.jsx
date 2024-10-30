import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'https://api-koicare-5f7e5d44b191.herokuapp.com/product',
});

// Interceptor to handle the token before making API calls
const handleBefore = (config) => {
    const token = localStorage.getItem('token')?.replaceAll('"', '');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
};

// Error handling for requests
const handleError = (error) => {
    console.error('API request error:', error);
    return Promise.reject(error);
};

// Apply the interceptor
api.interceptors.request.use(handleBefore, handleError);

// Fetch products
export const fetchProducts = async () => {
    const response = await api.get();
    return response.data;
};
// Fetch a product by ID
export const fetchProductById = async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
};
// Add a new product
export const addProduct = async (product) => {
    const response = await api.post('', product);
    return response.data;
};

// Update an existing product
export const updateProduct = async (id, product) => {
    const response = await api.put(`/${id}`, product);
    return response.data;
};

// Delete a product by ID
export const deleteProduct = async (id) => {
    await api.delete(`/${id}`);
};

