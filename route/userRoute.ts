import {Router} from "express";
import {
    addUser,
    deleteUser,
    getUser,
    loginUser,
    updateUser,
    userRegister,
    verifyCode
} from "../controller/userController";


const router = Router();

router.post("/register", userRegister);
router.post("/login", loginUser);
router.post("/verifyCode", verifyCode);
router.post("/getUser", getUser);
router.post("/addUser", addUser);
router.put("/updateUser", updateUser);
router.delete("/deleteUser", deleteUser);

export default router;
