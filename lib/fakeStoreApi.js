import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fakeStoreApi = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = async () => {
  const response = await fakeStoreApi.get('/products');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await fakeStoreApi.get(`/products/${id}`);
  return response.data;
};

export const getCategories = async () => {
  const response = await fakeStoreApi.get('/products/categories');
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await fakeStoreApi.get(`/products/category/${category}`);
  return response.data;
};