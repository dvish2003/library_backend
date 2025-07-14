import {NextFunction, Request, Response} from "express";
import {BorrowBookModel} from "../model/BookManage";
import {BookModel} from "../model/Book";
import {Receipt} from "../model/Receipt";
import {mailReceipt} from "./mailSender";
import {UserModel} from "../model/User";
import {LibraryMemberUserModel} from "../model/LibraryMemberUser";

export const addBookBorrow = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    console.log("Add book borrow function called...........",req.body);
    try {
        const bookBorrowData = new BorrowBookModel(req.body);
        const { bookId, memberId } = bookBorrowData;
        console.log("memberid",memberId)


        const book = await BookModel.findById(bookId);
        const user = await LibraryMemberUserModel.findById({
            _id: memberId
        })


        bookBorrowData.memberEmail = user?.email || "";
        bookBorrowData.bookTitle = book?.title || "";

        const saveBorrow = await bookBorrowData.save();

        if (saveBorrow) {
            //update available book -1
            const getBook = await BookModel.findOne({ _id: bookId });
            if (!getBook) {
                return res.status(400).json({
                    message: "Book not found",
                    status: 400
                });
            }
            if (getBook.availableCopies <= 0) {
                return res.status(400).json({
                    message: "No available copies of this book",
                    status: 400
                });
            }
            getBook.availableCopies = getBook.availableCopies - 1;
            const updateBook = await getBook.save();
            if (updateBook) {
                const receipt:Receipt = {
                    referenceNumber: saveBorrow._id.toString(),
                    bookId: bookBorrowData.bookId.toString(),
                    bookTitle: updateBook.title,
                    memberId: bookBorrowData.memberId.toString(),
                    memberEmail:bookBorrowData.memberEmail,
                    borrowDate: bookBorrowData.borrowDate,
                    returnDate: bookBorrowData.returnDate,
                    payStatus: bookBorrowData.payStatus,
                    payAmount:bookBorrowData.payAmount
                }
                await mailReceipt(receipt)
                return res.status(201).json({
                    message: "Book borrow added successfully",
                    bookBorrow: saveBorrow,
                    status: 201
                });
            }
            return res.status(400).json({
                message: "Book borrow not added",
                status: 400
            });

        }
    } catch (error) {
        console.error("Error adding book borrow:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
}
export const updateBookBorrow = async (req: Request, res: Response, next: NextFunction): Promise<any> => {}
export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    console.log("Get all book borrow function called");
    try {
        const bookBorrows = await BorrowBookModel.find();
        if (bookBorrows.length === 0) {
            return res.status(404).json({
                message: "No book borrows found",
                status: 404
            });
        }
        return res.status(200).json({
            message: "Book borrows retrieved successfully",
            bookBorrows,
            status: 200
        });
    } catch (error) {
        console.error("Error retrieving book borrows:", error);
        next(error);
        return res.status(500).json({
            message: "Internal server error",
            status: 500
        });
    }
}
