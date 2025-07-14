import {Router} from "express";
import {addBook, deleteBook, getAllBook, getBook, updateBook} from "../controller/bookController";

const bookRoute = Router();
bookRoute.post("/addBook",addBook);
bookRoute.put("/updateBook", updateBook);
bookRoute.post("/deleteBook", deleteBook);
bookRoute.post("/getAll", getAllBook);
bookRoute.post("/getBook", getBook);
export default bookRoute;
