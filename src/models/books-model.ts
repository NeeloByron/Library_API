// Book
export interface Book {
    id: number;
    title: string;
    authorId: number;
    year: number;
}

// storage for books
export const books: Book[] = [];
// auto-incrementing ID 
let nextBookId = 1;
export const getNextBookId = (): number => nextBookId++;