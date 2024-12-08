export interface Borrow {
    id?: number;
    book_id: number;
    user_id: number;
    day: number;
    start_date: Date;
    end_date: Date;
    status: number;
    book_title: string;
    user_name: string;
}

export enum BORROW_STATUS {
    PENDING = 0,
    APPROVED = 1,
    RETURN = 2,
    LATE = 3
}

export interface RequestBorrow {
    book_id: number;
    day: number;
}