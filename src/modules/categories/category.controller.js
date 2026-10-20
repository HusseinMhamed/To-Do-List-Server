import * as categoryService from './category.service.js'
import { asyncHandeler } from '../../common/middleware/asycHandler.js'
import { Router } from 'express'


export const CategoryRouter = Router()

CategoryRouter.get('/all', verifyJWT, asyncHandler(categoryService.getCategories));
CategoryRouter.get('/getbyid/:id', verifyJWT, asyncHandler(categoryService.getCategoryById));
CategoryRouter.post('/create', verifyJWT, asyncHandler(categoryService.createCategory));

CategoryRouter.patch('/update/:id', verifyJWT, asyncHandler(categoryService.updateCategory));
CategoryRouter.delete('/delete/:id', verifyJWT, asyncHandler(categoryService.deleteCategory));
