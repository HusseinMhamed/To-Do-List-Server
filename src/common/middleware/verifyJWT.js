import jwt from 'jsonwebtoken'
import { AppError } from '../../utils/appError.js'
import { User } from '../../modules/users/user.model.js'
export const verifyJWT = async (req ,res , next)=>{
    const headers = req.headers.authorization || req.headers.Authorization

    if(!headers?.startsWith('Bearer ')){
        return res.status(401).json({message:'unauthorized'})
    }
    const accessToken = headers.split(' ')[1]
    let decoded;
    try{
         decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET)
    }catch(err){
        throw new AppError('invalid of expired token', 401)
    }
    const user = await User.findByPk(decoded.id)
    // console.log(user)
    req.user ={ id:user.id ,role:user.role};
    next();
}