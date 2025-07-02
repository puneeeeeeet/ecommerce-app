import React from 'react';
import { getProducts } from '../lib/fakeStoreApi'; // Updated import path
import ProductListClient from '../components/ProductListClient';

// This component is a Server Component by default in the app directory.
// Data fetching here happens on the server.
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
    // ProductListClient is a Client Component that will handle all client-side
    // interactivity, including search, filter, and modals.
    <ProductListClient initialProducts={initialProducts} />
  );
}