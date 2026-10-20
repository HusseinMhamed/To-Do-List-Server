import { Router } from "express";
import * as userService from "./user.service.js";
import { asyncHandler } from "../../common/middleware/asycHandler.js";
import { allowedTo } from "../../utils/allowedTo.js";
import { verifyJWT } from "../../common/middleware/verifyJWT.js";

export const userRouter = Router();

userRouter.get('/getallusers',verifyJWT,allowedTo('admin'), asyncHandler(userService.getAllUsers))
userRouter.post('/register',asyncHandler(userService.register))
userRouter.post('/login', asyncHandler(userService.login))
userRouter.post('/logout',asyncHandler(userService.logout))
userRouter.get('/getuserbyid/:id',asyncHandler(userService.getUserById))
userRouter.patch('/updateuser',verifyJWT,asyncHandler(userService.updateuser))
userRouter.post('/makeadmin',verifyJWT,allowedTo('admin'),userService.makeUserAdmin)
userRouter.delete('/delete',verifyJWT,asyncHandler(userService.deleteUser))
