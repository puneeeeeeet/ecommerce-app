import React from 'react';
import { getProducts } from '../lib/fakeStoreApi'; 
import ProductListClient from '../components/ProductListClient';

export default async function HomePage() {
  let initialProducts = [];
  let error = null;

  try {
    initialProducts = await getProducts();
  } catch (err) {
    console.error("Failed to fetch initial products on server:", err);
    error = "Failed to load products. Please try again later.";
  }

  if (error) {
    return (
      <div className="text-center py-16 text-2xl text-red-700 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <ProductListClient initialProducts={initialProducts} />
  );
}