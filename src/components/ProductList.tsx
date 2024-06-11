import React, { useEffect, useState, useCallback } from 'react';
import { Product } from '../types';
import { fetchProducts, fetchCategories } from '../api/products';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const loadProducts = useCallback(async (category: string, page: number) => {
    try {
      const newProducts = await fetchProducts(page);
      let filtered = newProducts;
      if (category !== 'All') {
        filtered = newProducts.filter(product => product.category === category);
      }

      setAllProducts((prevProducts) => [...prevProducts, ...filtered]);

      if (newProducts.length === 0 || (category !== 'All' && filtered.length === 0)) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching products', error);
    }
  }, []);

  const loadCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories();
      setCategories(['All', ...fetchedCategories]);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const { lastElementRef, setLoadingState, loading } = useInfiniteScroll(() => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts(selectedCategory, page);
  }, [loadProducts, selectedCategory, page]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => product.category === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [allProducts, selectedCategory]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    setAllProducts([]);
    setFilteredProducts([]);
    setHasMore(true);
    setLoadingState(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-center mb-6">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded ${category === selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            ref={index === filteredProducts.length - 1 ? lastElementRef : null}
            key={product.id}
            className="border p-4 rounded shadow cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            role="listitem"
            tabIndex={0}
            aria-label={`Product: ${product.title}, Price: $${product.price}, Rating: ${product.rating.rate}`}
            onClick={() => handleProductClick(product.id)}
          >
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-4">${product.price}</p>
            <p className="text-gray-700 mb-4">Rating: {product.rating.rate}★</p>
            <p className="text-gray-700 mb-4">Category: {product.category}</p>
          </motion.div>
        ))}
      </div>
      {loading && <p className="text-center my-4">Loading...</p>}
    </div>
  );
};

export default ProductList;






