import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { fetchProducts } from '../api/products';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { motion } from 'framer-motion';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);

  const loadMoreProducts = async () => {
    try {
      const newProducts = await fetchProducts(page);
      setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      setPage((prevPage) => prevPage + 1);
      setLoadingState(false); 
    } catch (error) {
      console.error('Error fetching products', error);
      setLoadingState(false);
    }
  };

  const { loading, lastElementRef, setLoadingState } = useInfiniteScroll(loadMoreProducts);

  useEffect(() => {
    loadMoreProducts();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            ref={index === products.length - 1 ? lastElementRef : null}
            key={product.id}
            className="border p-4 rounded shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            role="listitem"
            tabIndex={0} 
            aria-label={`Product: ${product.title}, Price: $${product.price}, Rating: ${product.rating.rate}`} 
          >
            <img src={product.image} alt={product.title} className="w-full h-48 object-contain mb-4" />
            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-700 mb-4">${product.price}</p>
            <p className="text-gray-700-bold mb-4">Rating: {product.rating.rate}</p>
          </motion.div>
        ))}
      </div>
      {loading && <p className="text-center my-4">Loading...</p>}
    </div>
  );
};

export default ProductList;



