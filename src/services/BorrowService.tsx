import api from "@/lib/api";
import handleError from "@/lib/handleError";
import { Borrow, RequestBorrow } from "@/types/borrow";

export const BorrowService = {
  async list(): Promise<Borrow[]> {
    try {
      const response = await api.get("/borrows");
      return response.data.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  async approve(id: number | null): Promise<void> {
    try {
      const response = await api.post(`/borrows/approve`, { id });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  async return(id: number | null): Promise<void> {
    try {
      const response = await api.post(`/borrows/return`, { id });
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },

  async request(data: RequestBorrow): Promise<void> {
    try {
      const response = await api.post(`/borrows/request`, data);
      return response.data;
    } catch (error) {
      throw handleError(error);
    }
  },
};
