import axios from 'axios';
import { Product } from '../types';

const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (page: number, limit: number = 8): Promise<Product[]> => {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: { limit, page },
    });
    return response.data;
};


export const fetchProductById = async (id: number): Promise<Product> => {
    const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
    return response.data;
};
