import axios from 'axios';
import { Product } from '../types';

const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (page: number, limit: number = 20): Promise<{ products: Product[], total: number }> => {
    const response = await axios.get(`${BASE_URL}/products`, {
        params: { limit, page },
    });
    const total = parseInt(response.headers['x-total-count'], 10) || 100;
    return { products: response.data, total };
};

export const fetchProductById = async (id: number): Promise<Product> => {
    const response = await axios.get<Product>(`${BASE_URL}/products/${id}`);
    return response.data;
};

export const fetchCategories = async (): Promise<string[]> => {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data;
};

