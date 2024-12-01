import React, { useState, useEffect } from 'react';
import { Category } from '@/types/category';
import api from '@/lib/api';

interface CategoryFormProps {
  category?: Category;
  onSubmit: (category: Omit<Category, 'id' | 'name'>) => void;
  onCancel: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    id:0
  });

  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id as number,
        name: category.name
      });
    } else {
      setFormData({ 
        id: 0,
        name: '' 
    });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await api.patch('/categories/' + formData.id ,formData)
        setCategories(prevData => [...prevData, formData])
    } catch (error) {
        
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 mt-1 border rounded"
            required
          />
        </label>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          {category ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
};