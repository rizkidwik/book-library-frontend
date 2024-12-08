import { BorrowList } from "@/components/AdminBorrow/BorrowList";
import { BorrowBookCard } from "@/components/Borrow/BorrowBookCard";
import { BookService } from "@/services/BookService";
import { BorrowService } from "@/services/BorrowService";
import { Book } from "@/types/book";
import { Borrow } from "@/types/borrow";
import { useEffect, useState } from "react";

export const BorrowPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [borrows, setBorrows] = useState<Borrow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const roles = localStorage.getItem('roles');


  const fetchData = async () => {
    try {
      const fetchBook = await BookService.fetchBook();
      setBooks(fetchBook);
    } catch (error: any) {
        setError(error.message);
    }
  };

  const fetchListBorrow = async () => {
    try {
        const fetchListBorrow = await BorrowService.list();
        setBorrows(fetchListBorrow);
      } catch (error: any) {
          setError(error.message);
      }
  }

  useEffect(() => {
    if(roles == 'admin'){
        fetchListBorrow()
    } else {
        fetchData()
    }
  }, []);


  return ( roles != 'admin' ? 
    <div className="bg-white shadow rounded-lg p-6">
        <div className="alert alert-danger">
            {error}
        </div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Book</h1>
      </div>

      <BorrowBookCard books={books} />
    </div> : <div className="bg-white shadow rounded-lg p-6">
        <div className="alert alert-danger">
            {error}
        </div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">List Borrow</h1>
      </div>

      <BorrowList borrows={borrows} onActionComplete={fetchListBorrow} />
    </div>
  );
};
