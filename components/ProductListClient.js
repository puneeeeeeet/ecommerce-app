// components/ProductListClient.js

"use client";

import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductsByCategory } from '../lib/fakeStoreApi';
import ProductCard from './ui/ProductCard';
import ProductModal from './ui/ProductModal';
import SearchBar from './search/SearchBar';
import CategoryFilter from './filters/CategoryFilter';
import AddProductForm from './ui/AddProductForm';
import { useProductStore } from '../store/useProductStore';
import { useCartStore } from '../store/useCartStore';

const ProductListClient = ({ initialProducts }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const searchTerm = useProductStore((state) => state.searchTerm);
  const selectedCategory = useProductStore((state) => state.selectedCategory);
  const addItemToCart = useCartStore((state) => state.addItemToCart);

  const {
    data: clientFetchedProducts,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useQuery({ // <--- Changed to object form here
    queryKey: ['products', selectedCategory],
    queryFn: () => getProductsByCategory(selectedCategory),
    enabled: selectedCategory !== 'all',
    initialData: selectedCategory === 'all' ? initialProducts : undefined,
    staleTime: 5 * 60 * 1000,
  });

  // Determine the products to display: initial (from server) or client-fetched
  const productsToDisplay = selectedCategory === 'all' ? initialProducts : clientFetchedProducts;

  const filteredProducts = useMemo(() => {
    if (!productsToDisplay) return [];

    return productsToDisplay.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [productsToDisplay, searchTerm]);

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  const handleCloseModal = () => {
    setSelectedProductId(null);
  };

  const handleAddToCart = (product) => {
    addItemToCart(product);
    // Use a custom message box instead of alert()
    const messageBox = document.createElement('div');
    messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    messageBox.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto">
        <p class="text-lg font-semibold mb-4">${product.title} added to cart!</p>
        <button id="closeMessageBox" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">OK</button>
      </div>
    `;
    document.body.appendChild(messageBox);
    document.getElementById('closeMessageBox').onclick = () => {
      document.body.removeChild(messageBox);
    };
  };

  if (isClientLoading && selectedCategory !== 'all') {
    return <div className="text-center py-8 text-xl text-gray-700">Loading products for category "{selectedCategory}"...</div>;
  }

  if (isClientError && selectedCategory !== 'all') {
    return <div className="text-center py-8 text-xl text-red-600">Error fetching products for category "{selectedCategory}".</div>;
  }

  return (
    <div>
      <AddProductForm />

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
        <SearchBar />
        <CategoryFilter />
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-10 text-xl text-gray-600">No products found matching your criteria.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {selectedProductId && (
        <ProductModal productId={selectedProductId} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ProductListClient;