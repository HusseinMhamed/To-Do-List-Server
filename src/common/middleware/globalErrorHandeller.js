import { ForeignKeyConstraintError, UniqueConstraintError, ValidationError } from "sequelize";
import {AppError} from '../../utils/appError.js'
export const globalErrorHandeller = (err,req,res,next)=>{
      // console.error("err here",err)
      // console.error("ACTUAL ERROR:", err)
      let status , message;
    if(err instanceof AppError){
      status = err.status;
      message = err.message
    }else if(err instanceof UniqueConstraintError){
      status = 409;
      message = 'Error Dublicted value'
    }else if(err instanceof ForeignKeyConstraintError){
      status = 409;
      message = "forgot foreign Key"
    }else if (err instanceof ValidationError){
      status = 400;
      message= err.errors?.map(item=>item.message).join(' ;') || 'validation Error';
    }
    res.status(status|| 500).json({
        success: false,
        message: message || 'internal server error',
    })
  }