import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { authors } from "../models/authors-model";
import { books, getNextBookId, type Book} from "../models/books-model";

const router = Router();

// validation 
const idValidation = param("id").isInt({ min: 1}).withMessage("ID must be a positive integer");
// check authorId must exist in the authors array.
const authorIdExists = (value: number): boolean => authors.some((a) => a.id === value);

// shared field rules for POST and PUT.
const bookFields = [
    body("title").isString().withMessage("Title must be text").trim().notEmpty().withMessage("Title is required"),
    body("authorId").isInt({ min: 1 }).withMessage("authorId must be a positive integer").toInt().custom(authorIdExists).withMessage("authorId does not reference a valid author"),
    body("year").optional().isInt({ min: 0, max: 2100 }).withMessage("Year must be a valid year").toInt()
];

// POST
const createBookValidation = bookFields;

// PUT
const updateBookValidation = bookFields;

// Error helper
const sendValidationErrors = (req: Request, res: Response): boolean => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return true;
    }
    return false;
}

// Routes
// GET /books list all
router.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ success: true, data: books });
});

// GET /books/:id one book
router.get("/:id", idValidation, (req: Request, res: Response) => {
    if (sendValidationErrors(req, res))
        return;

    const book = books.find((b) => b.id === Number(req.params.id));
    if (!book) {
        res.status(404).json({ success: false, message: "Book not found"});
        return;
    }
    res.status(200).json({ success: true, data: book });
});

// POST /books create
router.post("/", createBookValidation, (req: Request, res: Response) => {
    if (sendValidationErrors(req, res))
        return;

    const { title, authorId, year } = req.body;
    const newBook: Book = {
        id: getNextBookId(),
        title,
        authorId,
        year: year ?? new Date().getFullYear(),
    };
    books.push(newBook);
    res.status(201).json({ success: true, data: newBook });
});

// PUT /books/:id full update
router.put("/:id", idValidation, updateBookValidation, (req: Request, res: Response) => {
    if (sendValidationErrors(req, res))
        return;

    const id = Number(req.params.id);
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) {
        res.status(404).json({ success: false, message: "Book not found" });
        return;
    }

    const { title, authorId, year } = req.body;
    books[index] = { id, title, authorId, year: year ?? books[index].year };
    res.status(200).json({ success: true, data: books[index] });
});

// DELETE /books/:id
router.delete("/:id", idValidation, (req: Request, res: Response) => {
    if (sendValidationErrors(req, res))
        return;

    const id = Number(req.params.id);
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) {
        res.status(404).json({ success: false, message: "Book not found" });
        return;
    }

    const [removed] = books.splice(index, 1);
    res.status(200).json({ success: true, data: removed });
});

export default router;


