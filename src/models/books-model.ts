// Book - What a book looks like
export interface Book {
    id: number;
    title: string;
    authorId: number;
}

// storage for books
// [] starts empty.
export const books: Book[] = [];
// auto-incrementing ID 
let nextBookId = 1;
export const getNextBookId = (): number => nextBookId++;