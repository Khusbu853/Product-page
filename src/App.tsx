import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import useCart from './hooks/useCart';

const ProductList = lazy(() => import('./components/ProductList'));
const ProductDetail = lazy(() => import('./components/ProductDetail'));

const App: React.FC = () => {
  useCart();

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:productId" element={<ProductDetail />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
};

export default App;

