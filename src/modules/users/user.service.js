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