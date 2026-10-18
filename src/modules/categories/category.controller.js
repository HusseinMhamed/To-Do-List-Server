import * as categoryService from './category.service.js'
import { asyncHandeler } from '../../common/middleware/asycHandeler.js'
import { Router } from 'express'

export const CategoryRouter = Router()

CategoryRouter.get('/all',asyncHandeler(categoryService.getCatigories))
CategoryRouter.get('/getbyid/:id',asyncHandeler(categoryService.getCatigoryById))
CategoryRouter.delete('/delete/:id',asyncHandeler(categoryService.deleteCategory))
CategoryRouter.post('/create',asyncHandeler(categoryService.createCategory))
CategoryRouter.patch('/update',asyncHandeler(categoryService.updateCategory))


