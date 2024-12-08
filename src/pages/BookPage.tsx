import { BookCard } from "@/components/Book/BookCard";
import { BookService } from "@/services/BookService";
import { Book } from "@/types/book";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BookPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate("/books/form");
  };


  const fetchData = async () => {
    try {
      const fetchBook = await BookService.fetchBook();
      setBooks(fetchBook);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async (id: number | null) => {
    try {
      await BookService.deleteBook(id);
      fetchData()
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white shadow rounded-lg p-6">
    {error && <div className="error-message">{error}</div>}
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Book</h1>
        <button
          onClick={handleAddBook}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Add Book
        </button>
      </div>

      <BookCard books={books} onDelete={handleDelete} />
    </div>
  );
};
