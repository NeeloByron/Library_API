import { Router, Request, Response, response } from "express";
import { body, param, validationResult } from "express-validator";

const router = Router()

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