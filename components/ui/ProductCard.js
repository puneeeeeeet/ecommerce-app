"use client";

import React from 'react';
import Image from 'next/image'; // Import Image component

const ProductCard = ({ product, onProductClick, onAddToCart }) => {
  return (
    <div className="border border-gray-200 bg-white p-4 rounded-lg shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow duration-200">
      {/* Changed <img> to <Image> */}
      <div className="relative w-full h-48 mb-4 cursor-pointer rounded-md overflow-hidden" onClick={() => onProductClick(product.id)}>
        <Image
          src={product.image}
          alt={product.title}
          fill // Use fill to make it cover the parent div
          style={{ objectFit: 'contain' }} // Keep objectFit: 'contain'
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" // Responsive sizes
        />
      </div>
      <h3
        className="text-lg font-semibold mb-2 cursor-pointer hover:text-blue-600 line-clamp-2"
        onClick={() => onProductClick(product.id)}
      >
        {product.title}
      </h3>
      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
        <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 text-sm font-medium shadow-md"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;