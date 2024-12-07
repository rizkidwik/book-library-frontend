import api from "@/lib/api";
import handleError from "@/lib/handleError";
import { Book } from "@/types/book";

export const BookService = {
  async fetchBook(): Promise<Book[]> {
    try {
      const response = await api.get("/books");
      return response.data.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  async createBook(book: FormData): Promise<Book> {
    try {
      const response = await api.post("/books", book, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  async updateBook(book: Book): Promise<Book> {
      try {
          const response = await api.patch(`/books/${book.id}`,book)
          return response.data
      } catch (error) {
          throw handleError(error)
      }
  },

  async deleteBook(id: number | null): Promise<void> {
      try {
          const response = await api.delete(`books/${id}`)
          return response.data
      } catch (error) {
          throw handleError(error)
      }
  }
};
