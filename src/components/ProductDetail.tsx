import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Product } from '../types';
import { fetchProductById } from '../api/products';
import { addToCart, incrementQuantity, decrementQuantity } from '../store/cartSlice';
import { RootState } from '../store';
import { motion } from 'framer-motion';
import Header from './Header';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(Number(productId));
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [productId]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleIncrementQuantity = (productId: number) => {
    dispatch(incrementQuantity(productId));
  };

  const handleDecrementQuantity = (productId: number) => {
    dispatch(decrementQuantity(productId));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <Header/>
    <div className="container mx-auto p-6 mt-10 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-2">
        <motion.img
            src={product.image}
            alt={product.title}
            className="w-full mb-4 object-contain h-3/6 cursor-pointer"
            whileHover={{ rotateY: 360 }}
            transition={{ duration: 3 }}
            style={{ perspective: 1000 }}
        />
        </div>
        <div className="p-4 mt-4">
          <h2 className="text-3xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-700 my-4 font-bold text-[20px]">Price: ${product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-gray-700 mb-2">Rating: {product.rating.rate} </p>
          <p className="text-gray-700 mb-4">Category: {product.category}</p>
          {cartItems[product.id] ? (
              <div className="flex items-center space-x-2 mt-4">
                <button
                  onClick={() => handleDecrementQuantity(product.id)}
                  className=" text-white px-2 py-1 rounded bg-slate-950"
                >
                  -
                </button>
                <span>{cartItems[product.id].quantity}</span>
                <button
                  onClick={() => handleIncrementQuantity(product.id)}
                  className=" text-white px-2 py-1 rounded bg-slate-950"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 bg-slate-950 text-white px-4 py-2 rounded"
              >
                Add to Cart
              </button>
            )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductDetail;



