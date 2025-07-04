import React from 'react';
import CartIcon from '../ui/CartIcon'; 

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">E-commerce Store</h1>
        <CartIcon />
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} E-commerce App
      </footer>
    </div>
  );
};

export default Layout;