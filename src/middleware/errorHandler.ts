import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/appError"

// Centralized error handler
export const errorHandler = ( error: unknown, _req: Request, res: Response, next: NextFunction,
): void => {
    // Pass the error to Express if the response already started
    if (res.headersSent) { 
        next(error);
        return;
    }

    // Handle invalid JSON in the request body
    if ( error instanceof SyntaxError && "type" in error && error.type === "entity.parse.failed"
    ) {
        res.status(400).json({ success: false, message: "Invalid JSON" });
        return;
    }

    // Handle errors created using our AppError class
    if (error instanceof AppError) {
        res.status(error.statusCode).json({ success: false,message: error.message,});
        return;
    }

    // Log unexpected errors on the server
    console.error(error);

    res.status(500).json({ success: false, message: "Internal server error",});
};