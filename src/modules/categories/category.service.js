import { Category } from './category.model.js'
import { AppError} from '../../utils/appError.js'

export const getCatigories =async(req,res)=>{
    let founCatigories =await Category.findAll()
    res.status(200).json(founCatigories)
}

export const getCatigoryById = async(req,res)=>{
    const {id} = req.params;
    const category =await Category.findByPk(id)
    if(!category){
        throw new AppError("category is not exist!",404);
    }
    res.status(200).json(category)
}



export const createCategory = async (req ,res)=>{
    const {userId , name , description} = req.body;
    const category = await Category.create({userId, name , description})
    res.status(200).json(category);
}

export const updateCategory = async(req , res)=>{
    const { name , description} = req.body
    const {id} = req.params;
    const updatedcategory =await Category.update({name , description},
        {where :{id}}
    )
    if(updatedcategory?.length==0){
        throw new AppError("category not found or cannot update",404);
    }
    res.status(200).json({message:"category updated successfully"})
}


export const deleteCategory =async (req,res)=>{
    const {id} = req.params;
    const deletedCategory = await Category.destroy({where:{id}})
    if(!deletedCategory){
        throw new AppError("category is not exist or connot be deleted ", 404);
    }
    res.status(200).json({message:"category deleted successfully"});
}
