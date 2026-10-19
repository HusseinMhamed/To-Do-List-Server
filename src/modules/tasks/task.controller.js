import { Router } from "express";
import { asyncHandeler } from '../../common/middleware/asycHandeler.js'
import * as taskServices from './task.service.js'
export const taskRouter = Router();

taskRouter.post('/create',asyncHandeler(taskServices.createTask));
taskRouter.get('/getall',asyncHandeler(taskServices.getTasks));
taskRouter.get('/getbyid/:id',asyncHandeler(taskServices.getById));
taskRouter.patch('/update/:id',asyncHandeler(taskServices.updateTask));
taskRouter.delete('/delete/:id',asyncHandeler(taskServices.deleteTask));
