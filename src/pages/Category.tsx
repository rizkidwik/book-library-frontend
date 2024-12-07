import React, { useEffect, useState } from "react";
import { Category } from "@/types/category";
import { CategoryTable } from "@/components/Category/CategoryTable";
import { CategoryForm } from "@/components/Category/CategoryForm";
import { Modal } from "@/components/Modal";
import { CategoryService } from "@/services/CategoryService";

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
//   const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async () => {
    await fetchData()
    setIsModalOpen(false);
  };

  const handleEdit = async () => {
    if (selectedCategory) {
      setSelectedCategory(null);
      await fetchData()
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: number | null ) => {
    try {
      await CategoryService.deleteCategory(id);
        fetchData();
    } catch (error: any) {
      setError(error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const fetchData = async () => {
    try {
    //   setLoading(true);
      const fetchCategory = await CategoryService.fetchCategory();
      setCategories(fetchCategory);
    } catch (error: any) {
      setError(error.message);
    //   setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
        {error && <div className="error-message">{error}</div>}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories Management</h1>
        <button
          onClick={() => {
            setSelectedCategory(null);
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
        title={selectedCategory ? "Edit Category" : "Add Category"}
      >
        <CategoryForm
          category={selectedCategory}
          onUpdate={handleEdit}
          onCreate={handleAdd}
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
