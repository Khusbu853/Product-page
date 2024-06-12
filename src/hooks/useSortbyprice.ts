import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';

interface FilterOptions {
  category: string;
  query: string;
  sortByPrice: 'asc' | 'desc';
}

const useProductFilter = (products: Product[]) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const filterProducts = useCallback(
    ({ category, query, sortByPrice }: FilterOptions) => {
      setLoading(true);
      let filtered = products;

      if (category !== 'All') {
        filtered = filtered.filter(product => product.category === category);
      }

      if (query) {
        filtered = filtered.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      filtered.sort((a, b) => {
        if (sortByPrice === 'asc') {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });

      setFilteredProducts(filtered);
      setLoading(false);
    },
    [products]
  );

  useEffect(() => {
    filterProducts({ category: 'All', query: '', sortByPrice: 'asc' });
  }, [filterProducts]);

  return { filteredProducts, loading, filterProducts };
};

export default useProductFilter;
