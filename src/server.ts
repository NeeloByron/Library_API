import bodyParser from "body-parser"
import express, { Express } from "express"
import { loggerMiddleware } from "./middleware/logger"
import authorRouter from "../src/routes/authors-route"
import bookRouter from "../src/routes/books-route";
import { errorHandler } from "./middleware/errorHandler";

const app: Express = express()
const PORT = process.env.PORT || 5000

// two build in middleware essential for passing incoming json data
app.use(express.json()) 
app.use(bodyParser.json()) 
app.use(loggerMiddleware);

// authors route
app.use("/authors", authorRouter)

// error handling
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})