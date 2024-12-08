import { Book } from "@/types/book";
import React, { useState } from "react";
import { Modal } from "../Modal";
import { BorrowService } from "@/services/BorrowService";
import { RequestBorrow } from "@/types/borrow";

interface BookCardProps {
  books: Book[];
}

export const BorrowBookCard: React.FC<BookCardProps> = ({ books }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<RequestBorrow>({
    book_id: 0,
    day: 0,
  });
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRequest = (data: Book) => {
    setFormData({
      ...formData,
      book_id: data.id ?? 0,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await BorrowService.request(formData);
      setIsModalOpen(false)

      setFormData({
        book_id: 0,
        day: 0,
      })
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((item) => (
        <div
          key={item.id}
          className="max-w-sm rounded overflow-hidden shadow-lg bg-white"
        >
          <img
            className="w-full h-[150px]"
            src={"http://localhost:3000/" + item.image_url}
            alt={item.title}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{item.title}</div>
            <div className="text-md">{item.description}</div>
          </div>
          <div className="max-w-sm p-5">
            <button
              onClick={() => handleRequest(item)}
              className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
            >
              Borrow
            </button>
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={"Request Borrow"}>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="book_id" value={formData?.book_id ?? 0} />
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Duration(day):
              <input
                type="number"
                min="1"
                max="7"
                name="day"
                value={formData?.day ?? 0}
                onChange={(e) =>
                  setFormData({ ...formData, day: Number(e.target.value) })
                }
                className="w-full p-2 mt-1 border rounded"
                required
              />
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
            >
              {"Submit Request"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
