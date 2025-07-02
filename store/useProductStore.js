import { create } from 'zustand';

export const useProductStore = create((set) => ({
  searchTerm: '',
  selectedCategory: 'all', // 'all' for no category filter
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));