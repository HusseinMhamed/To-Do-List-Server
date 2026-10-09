import {connection} from './common/config/database.js'
import { association } from './common/config/association.js';
import { globalErrorHandeller } from './common/middleware/globalErrorHandeller.js';
import { userRouter } from './modules/users/user.controller.js';
export function bootstrab (app,express){
    app.use(express.json())
    connection();
    association();

    app.use('/user',userRouter)

    app.use((req,res)=>{
        res.status(404).json('Rout is not found')
    })
    app.use(globalErrorHandeller)
}