"use client";

import React from 'react';
import CartIcon from '../ui/CartIcon';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center rounded-b-lg">
      <h1 className="text-2xl font-bold">E-commerce Store</h1>
      <CartIcon />
    </header>
  );
};

export default Header;