// author
export interface Author {
    id: number;
    authorName: string;
    title: string;
}

// storage for the authors 
export const authors: Author[] = [];

// it will start at 1 since the array starts empty
let nextAuthorId = 1;

export const getNextAuthorId = (): number => {
    return nextAuthorId++;
}