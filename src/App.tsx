import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const ProductList = lazy(() => import('./components/ProductList'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1 className="text-4xl font-bold text-center my-8">Product Page</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;

