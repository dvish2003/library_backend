import {Router} from "express";
import {addBookBorrow, getAll, updateBookBorrow} from "../controller/bookManagement";

const bookBorrowRoute = Router();
bookBorrowRoute.post('/saveBorrowBook',addBookBorrow);
bookBorrowRoute.get('/getAll',getAll);
bookBorrowRoute.post('/updateBorrowBook',updateBookBorrow);

export default bookBorrowRoute;