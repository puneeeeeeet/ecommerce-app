"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../lib/fakeStoreApi'; // Updated import path
import { useCartStore } from '../../store/useCartStore';

const ProductModal = ({ productId, onClose }) => {
  const { data: product, isLoading, isError } = useQuery(
    ['product', productId],
    () => getProductById(productId),
    {
      enabled: !!productId, // Only fetch if productId is available
      staleTime: 5 * 60 * 1000, // Keep data fresh for 5 minutes
    }
  );

  const addItemToCart = useCartStore((state) => state.addItemToCart);

  if (!productId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto shadow-2xl transform scale-95 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close modal"
        >
          &times;
        </button>

        {isLoading && <div className="text-center py-8 text-lg text-gray-700">Loading product details...</div>}
        {isError && <div className="text-center py-8 text-lg text-red-600">Error loading product details. Please try again.</div>}

        {product && (
          <div className="flex flex-col md:flex-row gap-6 mt-4">
            <div className="md:w-1/2 flex justify-center items-center p-4 bg-gray-50 rounded-lg">
              <img src={product.image} alt={product.title} className="max-h-80 object-contain rounded-md shadow-sm" />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-3 text-gray-900">{product.title}</h2>
              <p className="text-gray-700 mb-4 text-base leading-relaxed">{product.description}</p>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold text-green-600 mr-4">
                  ${product.price.toFixed(2)}
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="mb-6 text-gray-700 text-sm">
                <span className="font-semibold">Rating:</span> {product.rating.rate} / 5 (
                {product.rating.count} reviews)
              </div>
              <button
                onClick={() => {
                  addItemToCart(product);
                  onClose(); // Optionally close modal after adding to cart
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-lg font-semibold shadow-md"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductModal;