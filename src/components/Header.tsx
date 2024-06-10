import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Header: React.FC = () => {
    const navigate = useNavigate()
  const itemCount = useSelector((state: RootState) => state.cart.itemCount);

  const handleHomenavigate = () => {
    navigate(`/`)
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white top-0 sticky z-50">
      <h1 className="text-2xl cursor-pointer" onClick={() => handleHomenavigate()}>Store</h1>
        <div className="relative">
            <AiOutlineShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
            <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-600 text-white text-xs leading-tight text-center">
                {itemCount}
            </span>
            )}
        </div>
    </header>
  );
};

export default Header;
