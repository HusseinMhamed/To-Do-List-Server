import { Task } from "./task.model.js";
import { AppError } from "../../utils/appError.js";
import { Op } from "sequelize";
export async function createTask (req,res){
    const { title, description, status, priority, dueDate, implementorId,categoryId}= req.body;
    const creatorId = req.user.id
    const createdTask = Task.build({ title, description, status, priority, dueDate,creatorId, implementorId,categoryId})
    await createdTask.save();
    res.status(201).json(createdTask);
}

export const getTasks = async(req,res)=>{
    let tasks
    if(req.user.role=='admin'){
    tasks =await Task.findAll();
    }else{
        tasks = await Task.findAll({
            where:{
                [Op.or]:[
                    {creatorId:req.user.id},
                    {implementorId: req.user.id}
                ]
            }
        })
    }

    res.status(200).json(tasks);
}   

export async function getById(req,res){
    const {id} = req.params;
    const foundTask =await Task.findByPk(id);
    if(!foundTask){
        throw new AppError('Task not found', 404);
    }
    if (req.user.role !== 'admin' && foundTask.creatorId !== req.user.id && foundTask.implementorId !== req.user.id) {
        throw new AppError('You are not authorized to view this task', 403);
    }
    res.status(200).json(foundTask);
}

export const updateTask = async (req,res)=>{
    const { id } = req.params;
    
    const task = await Task.findByPk(id);
    if (!task) throw new AppError('Task not found', 404);

    if (req.user.role !== 'admin' && task.creatorId !== req.user.id) {
        throw new AppError('You are not authorized to update this task', 403);
    }

    await task.update(req.body);
    res.status(200).json({ message: 'Task updated successfully', data: task });
}

export const deleteTask = async (req,res)=>{
   const { id } = req.params;
    
    const task = await Task.findByPk(id);
    if (!task) throw new AppError('Task not found', 404);

    if (req.user.role !== 'admin' && task.creatorId !== req.user.id) {
        throw new AppError('You are not authorized to delete this task', 403);
    }

    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
}