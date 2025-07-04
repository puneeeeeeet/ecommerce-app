"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../../lib/fakeStoreApi'; 
import { useProductStore } from '../../store/useProductStore';

const CategoryFilter = () => {
  const { data: categories, isLoading, isError } = useQuery({ 
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: Infinity, 
  });
  const setSelectedCategory = useProductStore((state) => state.setSelectedCategory);
  const selectedCategory = useProductStore((state) => state.selectedCategory);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (isLoading) return <p className="text-gray-600">Loading categories...</p>;
  if (isError) return <p className="text-red-600">Error loading categories.</p>;

  return (
    <div className="mb-6 w-full flex md:w-auto">
    <label htmlFor="category" className="block text-sm font-medium text-gray-400 m-1 px-2">
        Filter by Category:
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="block w-full p-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
      >
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
      
    </div>
  );
};

export default CategoryFilter;