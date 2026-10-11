import { AppError } from "../../utils/appError.js";
import { User } from "./user.model.js"


export const register = async(req,res)=>{
let {name , email , password}= req.body;
let user = await User.create({name,email,password})
if(!user){
    throw new Error('can not create user')
}
return res.status(200).json(user)
}

export const getAllUsers = async (req,res)=>{
    let user = await User.findAll();
    return res.status(200).json({user})
}

export const getUserById=async (req,res)=>{
    let {id}= req.params;
    // let user = await User.findByPk(id,{attributes:['name','password','id']})
    let user = await User.scope('withpassword').findByPk(id)
    if(!user){
        throw new AppError('cannot find the user',409)
    }
    res.status(200).json(user)
}

export const updateuser = async(req, res)=>{
    const {name, email, password,Nemail,Npassword}= req.body
    const {id} = req.params;
    const user = await User.scope('withpassword').findByPk(id)
    if(!user){
        throw new AppError('user not found',409)
    }
    const verifyUser = user.password == password && user.email == email;
    // console.log("user.password: ",user.password)
    // console.log('password: ',password)
    // console.log("user.email: ",user.email)
    // console.log('email: ',email)
    if(!verifyUser){
        throw new AppError('Unauthorized',403);
    }
    user.email=Nemail;
    user.password = Npassword;
    user.name = name;
    await user.save();
    res.status(200).json({message:'user updated successfully' , user})
}


export const deleteUser =async(req,res)=>{
    const {id}= req.params
    const user =await User.findByPk(id)
    // console.log(user)
    if(!user){
        throw new AppError('user not found', 403);
    }
    await user.destroy();
    res.status(200).json({message:"user deleted successfully"})
}

