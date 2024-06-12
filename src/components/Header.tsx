import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const itemCount = useSelector((state: RootState) => state.cart.itemCount);
  const [searchQuery, setSearchQuery] = useState('');

  const handleHomenavigate = () => {
    navigate(`/`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white top-0 sticky z-50">
      <h1 className="text-2xl cursor-pointer px-3" onClick={handleHomenavigate}>Store</h1>
      <div className="relative flex items-center w-full max-w-md">
        <AiOutlineSearch className="absolute left-3 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full pl-10 pr-4 py-2 rounded bg-gray-100 text-black focus:outline-none"
        />
      </div>
      <div className="relative px-3">
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


