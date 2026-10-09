import { Router } from "express";
import * as userServic from "./user.service.js";
import { asyncHandeler } from "../../common/middleware/asycHandeler.js";

export const userRouter = Router();

userRouter.get('/getallusers', asyncHandeler(userServic.getAllUsers))
userRouter.post('/register',asyncHandeler(userServic.register))
