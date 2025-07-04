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
import MessageBox from './ui/MessageBox'; // Import the new MessageBox component

const ProductListClient = ({ initialProducts }) => {
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [messageBoxContent, setMessageBoxContent] = useState(null); // State for message box
  const searchTerm = useProductStore((state) => state.searchTerm);
  const selectedCategory = useProductStore((state) => state.selectedCategory);
  const addItemToCart = useCartStore((state) => state.addItemToCart);

  // ... (rest of useQuery and filteredProducts logic remains the same)
  const {
    data: clientFetchedProducts,
    isLoading: isClientLoading,
    isError: isClientError,
  } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => getProductsByCategory(selectedCategory),
    enabled: selectedCategory !== 'all',
    initialData: selectedCategory === 'all' ? initialProducts : undefined,
    staleTime: 5 * 60 * 1000,
  });

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
    setMessageBoxContent(`${product.title} added to cart!`); // Set content to show message box
  };

  const handleCloseMessageBox = () => {
    setMessageBoxContent(null); // Close message box
  };

  if (isClientLoading && selectedCategory !== 'all') {
    return <div className="text-center py-8 text-xl text-gray-700">Loading products for category {selectedCategory}...</div>;
  }

  if (isClientError && selectedCategory !== 'all') {
    return <div className="text-center py-8 text-xl text-red-600">Error fetching products for category {selectedCategory}.</div>;
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

      {messageBoxContent && (
        <MessageBox
          message={messageBoxContent}
          onClose={handleCloseMessageBox}
        />
      )}
    </div>
  );
};

export default ProductListClient;