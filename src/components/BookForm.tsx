import React, { useState, useEffect } from "react";
import { Category } from "@/types/category";
import { Book } from "@/types/book";
import { useNavigate } from "react-router-dom";
import { CategoryService } from "@/services/CategoryService";
import { BookService } from "@/services/BookService";

interface BookFormProps {
  books?: Book | null;
}

export const BookForm: React.FC<BookFormProps> = ({ books }) => {
  const [formData, setFormData] = useState<Omit<Book, "id,file">>({
    title: "",
    description: "",
    image_url: "",
    release_year: "",
    price: "",
    category_id: 0,
    total_page: 0,
    image: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };
  

  const [categories, setCategories] = useState<Category[]>([]);
  const [years, setYears] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/books");
  };

  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    generateYear();
  }, []);

  const fetchCategories = async () => {
    try {
      //   setLoading(true);
      const fetchCategory = await CategoryService.fetchCategory();
      setCategories(fetchCategory);
    } catch (error: any) {
      console.error(error);
    }
  };

  const generateYear = () => {
    const currentYear = new Date().getFullYear() + 5;
    const startYear = 1980;
    const yearList = Array.from(
      { length: currentYear - startYear + 1 },
      (_, i) => ({
        no: i + 1,
        year: currentYear - i, // Directly reverse the order
      })
    );

    setYears(yearList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("total_page", (formData.total_page ?? 0).toString());
      data.append("category_id", formData.category_id.toString());
      data.append("release_year", formData.release_year);
      data.append("price", formData.price);
      if (formData.image) {
        data.append("image_url", formData.image);
      }
      await BookService.createBook(data);
    } catch (error: any) {}
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {formError && <div className="error-message">{formError}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Title
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Description
            <input
              name="description"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 mt-1 border rounded"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">
            File
            <input
              name="image_url"
              type="file"
              className="w-full p-2 mt-1 border rounded"
              accept="image/jpg,image/png,image/jpeg"
              required
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Category</label>
          <select
            className="w-full p-2 mt-1 border"
            name="category_id"
            onChange={handleInputChange}
          >
            {categories.map((option, index) => {
              return (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Release Year</label>
          <select
            className="w-full p-2 mt-1 border"
            name="release_year"
            onChange={handleInputChange}
          >
            {years.map((option, index) => {
              return (
                <option key={index} value={option.year}>
                  {option.year}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Price</label>
          <input
            className="w-full p-2 mt-1 border"
            name="price"
            type="text"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Total Page</label>
          <input
            className="w-full p-2 mt-1 border"
            name="total_page"
            type="text"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            {books ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};
