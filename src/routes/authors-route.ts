import { Router, Request, Response } from "express";
import { body, param, validationResult } from "express-validator";
import { Author, authors } from '../models/authors-model';

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
    res.status(200).json({
        success: true,
        data: authors,
    });
});

// GET /authors/:id
