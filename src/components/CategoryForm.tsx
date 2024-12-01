import React, { useState, useEffect } from 'react';
import { Category } from '@/types/category';
import { CategoryService } from '@/services/CategoryService';

interface CategoryFormProps {
  category?: Category | null;
  onUpdate: (category: Category) => void;
  onCreate: (category: Category) => void;
  onCancel: () => void;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  category,
  onUpdate,
  onCreate,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<Category,'id'>>({
    name: ''
  });

  const [formError, setFormError] = useState<string | null>(null)
  
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name
      });
    } else {
      setFormData({ 
        name: '' 
    });
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        if(category && category.id){
            const updateCategory = await CategoryService.updateCategory({...formData, id: category.id})
            onUpdate(updateCategory)
        } else {
            const newCategory = await CategoryService.createCategory(formData)
            onCreate(newCategory)
        }
    } catch (error: any) {
        setFormError(error.message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
      {formError && <div className="error-message">{formError}</div>}
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