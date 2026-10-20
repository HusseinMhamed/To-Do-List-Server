import { Router } from "express";
import * as userService from "./user.service.js";
import { asyncHandeler } from "../../common/middleware/asycHandeler.js";
import { allowedTo } from "../../utils/allowedTo.js";
import { verifyJWT } from "../../common/middleware/verifyJWT.js";

export const userRouter = Router();

userRouter.get('/getallusers',verifyJWT,allowedTo('admin'), asyncHandeler(userService.getAllUsers))
userRouter.post('/register',asyncHandeler(userService.register))
userRouter.get('/getuserbyid/:id',asyncHandeler(userService.getUserById))
userRouter.patch('/updateuser/:id',asyncHandeler(userService.updateuser))
userRouter.delete('/delete/:id',asyncHandeler(userService.deleteUser))
