import { create } from 'zustand';

export const useProductStore = create((set) => ({
  searchTerm: '',
  selectedCategory: 'all', 
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));