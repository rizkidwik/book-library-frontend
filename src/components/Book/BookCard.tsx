import { Book } from "@/types/book"
import React from "react";
import { useNavigate } from "react-router-dom";

interface BookCardProps {
    books: Book[],
    onDelete: (id: number | null) => void;
  }
  
export const BookCard: React.FC<BookCardProps> = ({
    books,
    onDelete
}) => {

    const navigate = useNavigate();

    const handleEdit = (item: Book) => {
        navigate("/books/form",{state: item})
    }

    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((item) => (
                <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                    <img className="w-full h-[150px]" src={'http://localhost:3000/' + item.image_url} alt={item.title} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{item.title}</div>
                        <div className="text-md">{item.description}</div>
                    </div>
                    <div className="max-w-sm p-5">
                    <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 mr-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                    Edit
                    </button>
                    <button
                    onClick={() => onDelete(item.id ?? null)}
                    className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                    >
                    Delete
                    </button>
                    </div>
                </div>
            ))}
        </div>
    )
}