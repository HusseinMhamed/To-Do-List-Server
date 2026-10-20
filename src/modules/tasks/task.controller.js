import { Router } from "express";
import { asyncHandler } from '../../common/middleware/asycHandler.js'
import * as taskServices from './task.service.js'
import { verifyJWT } from "../../common/middleware/verifyJWT.js";
export const taskRouter = Router();

taskRouter.post('/create',verifyJWT,asyncHandler(taskServices.createTask));
taskRouter.get('/getall',verifyJWT,asyncHandler(taskServices.getTasks));
taskRouter.get('/getbyid/:id',verifyJWT,asyncHandler(taskServices.getById));
taskRouter.patch('/update/:id',verifyJWT,asyncHandler(taskServices.updateTask));
taskRouter.delete('/delete/:id',verifyJWT,asyncHandler(taskServices.deleteTask));
