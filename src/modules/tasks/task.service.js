import { Task } from "./task.model.js";
import { AppError } from "../../utils/appError.js";

export async function createTask (req,res){
    const { title, description, status, priority, dueDate,creatorId, implementorId,categoryId}= req.body;
    const createdTask = Task.build({ title, description, status, priority, dueDate,creatorId, implementorId,categoryId})
    await createdTask.save();
    res.status(200).json(createdTask);
}

export const getTasks = async(req,res)=>{
    const Tasks =await Task.findAll();
    res.status(200).json(Tasks);
}   

export async function getById(req,res){
    const {id} = req.params;
    const foundTask =await Task.findByPk(id);
    if(!foundTask){
        throw new AppError('Task not found', 404);
    }
    res.status(200).json(foundTask);
}

export const updateTask = async (req,res)=>{
    const {id} = req.params;
    const updatedTask =await Task.update(req.body, {where:{id}})
    if(updatedTask.length==0){
        throw new AppError('cannot find task',404);
    }
    res.status(200).json('task updated successfully');
}

export const deleteTask = async (req,res)=>{
    const {id} = req.params;
    const deletedTask = await Task.destroy({where:{id}})
    if(!deletedTask){
        throw new AppError("cannot find Task",204);
    }
    res.status(200).json({message:"task deleted successfully"})
}