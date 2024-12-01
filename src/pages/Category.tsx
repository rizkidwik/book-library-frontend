import React, { useEffect, useState } from 'react';
import { Category } from '@/types/category';
import { CategoryTable } from '@/components/CategoryTable';
import { CategoryForm } from '@/components/CategoryForm';
import { Modal } from '@/components/Modal';
import api from '@/lib/api';
import axios from 'axios';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(
    undefined
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null)

  const handleAdd = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      id: categories.length + 1,
      ...categoryData,
    };
    setCategories([...categories, newCategory]);
    setIsModalOpen(false);
  };

  const handleEdit = (categoryData: Omit<Category, 'id'>) => {
    if (selectedCategory) {
      const updatedCategories = categories.map((cat) =>
        cat.id === selectedCategory.id
          ? { ...selectedCategory, ...categoryData }
          : cat
      );
      setCategories(updatedCategories);
      setSelectedCategory(undefined);
      setIsModalOpen(false);
    }


  };

  const handleDelete = async (id: number) => {
    try {
        const response = await api.delete(`/categories/${id}`)
        if(response){
            fetchData()
        }
    } catch (error) {
        if(axios.isAxiosError(error)){
            setError(error.message)
        }

        setError('Error')
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(undefined);
  };

  const fetchData = async () => {
      try {
          const response = await api.get('/categories')
          setCategories(response.data.data.data)
      } catch (error) {
          
      }
  }

  useEffect(() => {
    fetchData()
  },[])
  
  return (
    <div className="bg-white shadow rounded-lg p-6">
    <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <button
        onClick={() => {
            setSelectedCategory(undefined);
            setIsModalOpen(true);
        }}
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
        Add Category
        </button>
    </div>

    <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedCategory ? 'Edit Category' : 'Add Category'}
    >
        <CategoryForm
        category={selectedCategory}
        onSubmit={selectedCategory ? handleEdit : handleAdd}
        onCancel={closeModal}
        />
    </Modal>

    <CategoryTable
        categories={categories}
        onEdit={(category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
        }}
        onDelete={handleDelete}
    />
    </div>
  );
};

export default CategoriesPage;

