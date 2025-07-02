"use client";

import React from 'react';
import { useProductStore } from '../../store/useProductStore';
import useDebounce from '../../hooks/useDebounce';

const SearchBar = () => {
  const setSearchTerm = useProductStore((state) => state.setSearchTerm);
  const searchTerm = useProductStore((state) => state.searchTerm);

  const [localSearchInput, setLocalSearchInput] = React.useState(searchTerm);
  const debouncedSearchTerm = useDebounce(localSearchInput, 500);

  React.useEffect(() => {
    setSearchTerm(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchTerm]);

  return (
    <div className="mb-6 w-full">
      <input
        type="text"
        placeholder="Search products by name..."
        value={localSearchInput}
        onChange={(e) => setLocalSearchInput(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
      />
    </div>
  );
};

export default SearchBar;