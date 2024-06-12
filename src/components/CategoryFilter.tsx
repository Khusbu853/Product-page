import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryClick: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryClick(category)}
            className={`px-4 py-2 rounded ${category === selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
