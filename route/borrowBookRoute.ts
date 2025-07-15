import {Router} from "express";
import {addBookBorrow, getAll, updateBookBorrow} from "../controller/bookManagement";
import {authenticate} from "../middleware/authenticate";

const bookBorrowRoute = Router();
bookBorrowRoute.post('/saveBorrowBook',authenticate,addBookBorrow);
bookBorrowRoute.get('/getAll',authenticate,getAll);
bookBorrowRoute.post('/updateBorrowBook',authenticate,updateBookBorrow);

export default bookBorrowRoute;