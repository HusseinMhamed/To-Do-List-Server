import { Router } from "express";
import { asyncHandeler } from '../../common/middleware/asycHandler.js'
import * as taskServices from './task.service.js'
import { verifyJWT } from "../../common/middleware/verifyJWT.js";
export const taskRouter = Router();

taskRouter.post('/create',verifyJWT,asyncHandeler(taskServices.createTask));
taskRouter.get('/getall',verifyJWT,asyncHandeler(taskServices.getTasks));
taskRouter.get('/getbyid/:id',verifyJWT,asyncHandeler(taskServices.getById));
taskRouter.patch('/update/:id',verifyJWT,asyncHandeler(taskServices.updateTask));
taskRouter.delete('/delete/:id',verifyJWT,asyncHandeler(taskServices.deleteTask));
