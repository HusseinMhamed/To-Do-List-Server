import { Category } from './category.model.js'
import { AppError} from '../../utils/appError.js'

export const getCatigories =async(req,res)=>{
    let categories;
    if (req.user.role === 'admin') {
        categories = await Category.findAll();
    } else {
        categories = await Category.findAll({ where: { userId: req.user.id } });
    }
    res.status(200).json(categories);
}

export const getCatigoryById = async(req,res)=>{
     const { id } = req.params;
    const category = await Category.findByPk(id);
    
    if (!category) {
        throw new AppError("Category not found", 404);
    }
    if (category.userId !== req.user.id && req.user.role !== 'admin') {
        throw new AppError("You are not authorized to view this category", 403);
    }

    res.status(200).json(category);
}



export const createCategory = async (req ,res)=>{
    const { name , description} = req.body;
    const userId = req.user.id
    const category = await Category.create({userId, name , description})
    res.status(201).json(category);
}

export const updateCategory = async(req , res)=>{
    const { name , description} = req.body
    const {id} = req.params;
     const category = await Category.findByPk(id);
    if (!category) {
        throw new AppError("Category not found", 404);
    }

    if (category.userId !== req.user.id && req.user.role !== 'admin') {
        throw new AppError("You are not authorized to update this category", 403);
    }

    await category.update({ name, description });
    res.status(200).json({ message: "Category updated successfully", data: category });
}


export const deleteCategory =async (req,res)=>{
       const { id } = req.params;
    
    const category = await Category.findByPk(id);
    if (!category) {
        throw new AppError("Category not found", 404);
    }

    if (category.userId !== req.user.id && req.user.role !== 'admin') {
        throw new AppError("You are not authorized to delete this category", 403);
    }

    await category.destroy();
    res.status(200).json({ message: "Category deleted successfully" });
}
