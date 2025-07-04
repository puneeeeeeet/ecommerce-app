// components/ui/AddProductForm.js

"use client";

import React, { useState } from 'react'; // Import useState
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import MessageBox from './MessageBox'; // Import the new MessageBox component

const addProductSchema = z.object({
  title: z.string().min(3, 'Title is required and must be at least 3 characters.'),
  price: z.number().positive('Price must be a positive number.'),
  description: z.string().min(10, 'Description is required and must be at least 10 characters.'),
  category: z.string().min(1, 'Category is required.'),
  image: z.string().url('Image must be a valid URL.'),
});

const AddProductForm = () => {
  const [messageBoxContent, setMessageBoxContent] = useState(null); // State for message box

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addProductSchema),
  });

  const onSubmit = (data) => {
    console.log('Simulating product submission:', data);
    setMessageBoxContent('Product (simulated) added successfully!'); // Set content to show message box
    reset(); // Clear the form
  };

  const handleCloseMessageBox = () => {
    setMessageBoxContent(null); // Close message box
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Product (Simulated)</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* ... (form fields unchanged) ... */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="number"
            id="price"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            rows="3"
            {...register('description')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <input
            type="text"
            id="category"
            {...register('category')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            {...register('image')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2.5 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>
        {/* ... (end of form fields) ... */}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2.5 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-semibold shadow-md transition-colors"
        >
          Add Product
        </button>
      </form>

      {messageBoxContent && (
        <MessageBox
          message={messageBoxContent}
          onClose={handleCloseMessageBox}
        />
      )}
    </div>
  );
};

export default AddProductForm;