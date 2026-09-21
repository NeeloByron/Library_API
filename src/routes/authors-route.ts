import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { Author, authors, getNextAuthorId } from '../models/authors-model';

const router = Router();

// validators
const idValidation = param("id").isInt({ min: 1 }).withMessage("ID must be a positive integer");

const authorValidation = [
    body("authorName").isString().withMessage("Author name must be text").trim().notEmpty().withMessage("Author name is required"),
    body("title").isString().withMessage("Title must be text").trim().notEmpty().withMessage("Title is required"),
];

// error in validation  
const sendValidationErrors = (req: Request, res: Response): boolean => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors.array(),
        });
        return true;
    }
    return false;
}

// GET /authors
router.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ success: true,data: authors, });
});

// GET /authors/:id
router.get("/:id", idValidation, (req: Request, res: Response) => {
    // 404 response if the ID is invalid
    if (sendValidationErrors(req, res)) {
        return;
    }

    const id = Number(req.params.id);
     // find the author with the same ID
    const author = authors.find((author) => author.id === id);
    if (!author) {
        res.status(404).json({ success: false, message: "Author not found"});
        return;
    }

    res.status(200).json({ success: true, data: author });
});

// POST /authors
router.post("/", authorValidation, (req: Request, res: Response) => {
     // run express-validator's checks 
    if (sendValidationErrors(req, res))
        return;

    const newAuthor: Author = {
        id: getNextAuthorId(),
        authorName: req.body.authorName,
        title: req.body.title,
    };
     // Persist to the in-memomery store
    authors.push(newAuthor);
     // 201 created 
    res.status(201).json({ success: true, data: newAuthor });
});

// PUT /authors/:id
router.put("/:id", [idValidation, ...authorValidation], (req: Request, res: Response ) => {
    if (sendValidationErrors(req, res))
        return;

    const author = authors.find((item) => item.id === Number(req.params.id),);
    if (!author) { res.status(404).json({ success: false, message: "Author not found"});
       return;
    }

   author.authorName = req.body.authorName;
    author.title = req.body.title;

    res.status(200).json({
      success: true,
      data: author,
    });
  },
);

// DELET /authors/:id
router.delete("/:id", idValidation, (req: Request, res: Response) => {
    if (sendValidationErrors(req, res))
        return;

    const authorIndex = authors.findIndex(
        (item) => item.id === Number(req.params.id) 
    );

    if (authorIndex === -1) {
        res.status(404).json({ success: false, message: "Author not found"});
        return;
    }

    const [deleteAuthor] = authors.splice(authorIndex, 1);
    res.status(200).json({ success: true, message: "Author deleted successfully", data: deleteAuthor });
});

export default router;