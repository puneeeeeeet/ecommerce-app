"use client";

import React from 'react';
import { useCartStore } from '../../store/useCartStore';

const CartModal = ({ onClose }) => {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeItemFromCart = useCartStore((state) => state.removeItemFromCart);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative max-h-[90vh] overflow-y-auto shadow-2xl transform scale-95 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close cart"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-center py-4">Your cart is empty.</p>
        ) : (
          <>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mr-4 rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItemFromCart(item.id)}
                      className="ml-4 text-red-600 hover:text-red-800 transition-colors"
                      aria-label="Remove item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm6 0a1 1 0 11-2 0v6a1 1 0 112 0V8z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-gray-200 text-right">
              <p className="text-xl font-bold text-gray-900 mb-4">Total: ${calculateTotal()}</p>
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-5 py-2.5 rounded-md hover:bg-red-600 mr-3 font-semibold shadow-md transition-colors"
              >
                Clear Cart
              </button>
              <button className="bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-700 font-semibold shadow-md transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;