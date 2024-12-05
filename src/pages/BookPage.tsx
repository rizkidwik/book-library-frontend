import { BookCard } from "@/components/BookCard";
import { BookService } from "@/services/BookService";
import { Book } from "@/types/book";
import { useEffect, useState } from "react";



export const BookPage:React.FC = () => {
    const [books, setBooks] = useState<Book[]>([])
    const [error, setError] = useState<string | null>(null)
    
    const fetchData = async () => {
        try {
            const fetchBook = await BookService.fetchBook();
            setBooks(fetchBook);
        } catch (error: any) {
            setError(error.message);
        }
    }
    
    useEffect(() => {
        fetchData();
      }, []);

    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Book</h1>
            <BookCard 
            books={books}
            />
      </div>
    );
  };
  