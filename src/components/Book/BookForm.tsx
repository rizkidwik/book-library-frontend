import React, { useState, useEffect } from "react";
import { Category } from "@/types/category";
import { Book } from "@/types/book";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryService } from "@/services/CategoryService";
import { BookService } from "@/services/BookService";

export const BookForm = () => {
  const location = useLocation();
  const bookData = location.state as Book | undefined;
  const [categories, setCategories] = useState<Category[]>([]);
  const [years, setYears] = useState<any[]>([]);
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

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

  const handleCancel = () => {
    navigate("/books");
  };

  const populateEdit = () => {
    if (bookData) {
      setFormData({
        id: bookData.id || 0,
        title: bookData.title || "",
        description: bookData.description || "",
        image_url: bookData.image_url || "",
        release_year: bookData.release_year || "",
        price: bookData.price || "",
        category_id: Number(bookData.category_id) || 0,
        total_page: bookData.total_page || 0,
        image: bookData.image || null,
      });
    }
  };

  const fetchCategories = async () => {
    try {
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
      if (!bookData) {
        await BookService.createBook(data);
      } else {
        await BookService.updateBook({ ...formData, id: formData.id });
      }
      navigate("/books");
    } catch (error: any) {}
  };

  useEffect(() => {
    fetchCategories();
    generateYear();
    populateEdit();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {formError && <div className="error-message">{formError}</div>}
      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={formData.id} />
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
              required={bookData?.image_url ?  false : true} 
              onChange={handleFileChange}
            />
          </label>
        </div>
        {bookData?.image_url ? (
          <div className="mb-4">
            <img
              className="w-full"
              src={"http://localhost:3000/" + bookData?.image_url}
            />
          </div>
        ) : (
          ``
        )}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Category</label>
          <select
            className="w-full p-2 mt-1 border"
            name="category_id"
            value={formData?.category_id}
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
            value={formData?.release_year}
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
            value={formData.price}
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
            value={formData.total_page}
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
            {bookData ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};
