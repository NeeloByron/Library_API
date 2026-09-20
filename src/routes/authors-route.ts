import { Router, Request, Response, response } from "express";
import { body, param, validationResult } from "express-validator";

const router = Router()

let authors = [
    {id: 1, authorName: "Byron", title: "The adventures of the fixer"},
    {id: 2, authName: "Leano", title: 'The upbrining of the boy' }
]

router.get("/", (req: Request, res: Response) => {
    res.status(200).json(authors)
})

router.get("/:id", [param("id").isInt().withMessage("ID must be an integer")], (req: Request, res: Response) => {
    const errors = validationResult(req)
    
    console.log(errors, "errors from express-validator middleware");
    if(!errors.isEmpty()){
        return res
    }
})