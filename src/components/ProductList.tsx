import React, { useEffect, useState, useCallback } from 'react';
import { fetchProducts, fetchCategories } from '../api/products';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import CategoryFilter from './CategoryFilter';
import useProductFilter from '../hooks/useSortbyprice';
import { Product } from '../types';

const ProductList: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortByPrice, setSortByPrice] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  const { filteredProducts, loading, filterProducts } = useProductFilter(allProducts);

  const loadProducts = useCallback(async (page: number) => {
    try {
      const { products, total } = await fetchProducts(page);
      setAllProducts(products);
      setTotalPages(Math.ceil(total / 20));
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

  useEffect(() => {
    loadProducts(currentPage);
    loadCategories();
  }, [currentPage, loadProducts]);

  useEffect(() => {
    filterProducts({ category: selectedCategory, query: searchQuery, sortByPrice });
  }, [allProducts, selectedCategory, searchQuery, sortByPrice, filterProducts]);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    filterProducts({ category, query: searchQuery, sortByPrice });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterProducts({ category: selectedCategory, query, sortByPrice });
  };

  const handleSortByPrice = (value: 'asc' | 'desc') => {
    setSortByPrice(value);
    filterProducts({ category: selectedCategory, query: searchQuery, sortByPrice: value });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    setSelectedCategory('All');
    setSearchQuery('');
    setSortByPrice('asc');
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <div className="container mx-auto p-6">
        <div className="flex flex-wrap justify-between items-center mb-6 ">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
          <select
            value={sortByPrice}
            onChange={(e) => handleSortByPrice(e.target.value as 'asc' | 'desc')}
            className="px-4 py-2 rounded bg-gray-200 text-gray-800"
          >
            <option value="asc">Sort by Price: Low to High</option>
            <option value="desc">Sort by Price: High to Low</option>
          </select>
        </div>
        {loading ? (
          <p className="text-center my-4">Loading...</p>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="border p-4 rounded shadow cursor-pointer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
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
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2 mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <h1 className="text-center my-4">No product found</h1>
        )}
      </div>
    </div>
  );
};

export default ProductList;














