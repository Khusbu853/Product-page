import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const useCartPersist = () => {
  const cart = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
};

export default useCartPersist;

