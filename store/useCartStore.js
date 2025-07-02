import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cartItems: [],
  addItemToCart: (product) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, { ...product, quantity: 1 }] };
      }
    }),
  removeItemFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),
  updateItemQuantity: (productId, quantity) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      ),
    })),
  clearCart: () => set({ cartItems: [] }),
  getCartTotalItems: () =>
    set((state) => state.cartItems.reduce((total, item) => total + item.quantity, 0)),
}));