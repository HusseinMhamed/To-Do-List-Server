import { Router } from "express";
import * as userService from "./user.service.js";
import { asyncHandeler } from "../../common/middleware/asycHandler.js";
import { allowedTo } from "../../utils/allowedTo.js";
import { verifyJWT } from "../../common/middleware/verifyJWT.js";

export const userRouter = Router();

userRouter.get('/getallusers',verifyJWT,allowedTo('admin'), asyncHandeler(userService.getAllUsers))
userRouter.post('/register',asyncHandeler(userService.register))
userRouter.post('/login', asyncHandeler(userService.login))
userRouter.post('/logout',asyncHandeler(userService.logout))
userRouter.get('/getuserbyid/:id',asyncHandeler(userService.getUserById))
userRouter.patch('/updateuser',verifyJWT,asyncHandeler(userService.updateuser))
userRouter.post('/makeadmin',verifyJWT,allowedTo('admin'),userService.makeUserAdmin)
userRouter.delete('/delete',verifyJWT,asyncHandeler(userService.deleteUser))
