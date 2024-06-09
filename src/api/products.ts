import axios from 'axios';
import { Product } from '../types';

const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (page: number, limit: number = 8): Promise<Product[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
      params: { limit, page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
};
