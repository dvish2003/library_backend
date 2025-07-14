import {Router} from "express";
import {addBookBorrow} from "../controller/bookManagement";

const bookBorrowRoute = Router();
bookBorrowRoute.post('/saveBorrowBook',addBookBorrow);

export default bookBorrowRoute;