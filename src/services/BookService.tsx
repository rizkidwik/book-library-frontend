import api from "@/lib/api";
import handleError from "@/lib/handleError";
import { Book } from "@/types/book";

export const BookService = {
    async fetchBook(): Promise<Book[]> {
        try {
            const response = await api.get('/books')
            return response.data.data
        } catch (error) {
            throw handleError(error)
        }
    },

    // async createCategory(category: Omit<Category, 'id'>): Promise<Category> {
    //     try {
    //         const response = await api.post('/categories',category)
    //         return response.data
    //     } catch (error) {
    //         throw handleError(error)
    //     }
    // },
    
    // async updateCategory(category: Category): Promise<Category> {
    //     try {
    //         const response = await api.patch(`/categories/${category.id}`,category)
    //         return response.data
    //     } catch (error) {
    //         throw handleError(error)
    //     }
    // },

    // async deleteCategory(id: number | null): Promise<void> {
    //     try {
    //         const response = await api.delete(`categories/${id}`)
    //         return response.data
    //     } catch (error) {
    //         throw handleError(error)
    //     }
    // }
}

