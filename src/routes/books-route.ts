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
