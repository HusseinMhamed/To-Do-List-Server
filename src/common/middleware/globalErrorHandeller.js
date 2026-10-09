export const globalErrorHandeller = (err,req,res,next)=>{
      console.error("err here",err)
    res.status(err.statusCode|| 500).json({
        success: false,
        message: err.message || 'internal server error',
        sqlMessage:err.sqlMessage
    })
  }