import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';

interface CartState {
  items: { [key: number]: { product: Product; quantity: number } };
  itemCount: number;
}

const loadCartFromLocalStorage = (): CartState => {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    return JSON.parse(storedCart);
  }
  return {
    items: {},
    itemCount: 0,
  };
};

const initialState: CartState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      if (state.items[product.id]) {
        state.items[product.id].quantity += 1;
      } else {
        state.items[product.id] = { product, quantity: 1 };
      }
      state.itemCount += 1;
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.items[productId]) {
        state.items[productId].quantity += 1;
        state.itemCount += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.items[productId]) {
        state.items[productId].quantity -= 1;
        state.itemCount -= 1;
        if (state.items[productId].quantity === 0) {
          delete state.items[productId];
        }
      }
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;

