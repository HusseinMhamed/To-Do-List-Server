import { AppError } from "../../utils/appError.js";
import { User } from "./user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async(req,res)=>{
let {name , email , password}= req.body;
if(!name || !email || !password){
    throw new AppError('please fill all' , 400)
}
const founduser = await User.findOne({where:{email}})

if(founduser){
    throw new AppError("User already Exits", 409);
}

const hashedPassword =await bcrypt.hash(password , 10)

let user = await User.create({name,email,password:hashedPassword})
const accessToken = jwt.sign({id:user.id ,role : user.role}, process.env.JWT_ACCESS_SECRET,{ expiresIn: '15m' })
const refreshToken = jwt.sign({id:user.id , role: user.role}, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'})
res.cookie('jwt',refreshToken , {
    httpOnly:true,
    // secure: true,
    // sameSite: 'None',
    maxAge: 1000*60*60*24*7
})
return res.status(201).json({accessToken , email:user.email , name : user.name})
}

export const getAllUsers = async (req,res)=>{
    let user = await User.findAll();
    return res.status(200).json({user})
}

export const getUserById=async (req,res)=>{
    let {id}= req.params;
    // let user = await User.findByPk(id,{attributes:['name','password','id']})
    let user = await User.findByPk(id)
    if(!user){
        throw new AppError('cannot find the user',409)
    }
    res.status(200).json(user)
}

export const updateuser = async(req, res)=>{
    const {name, email, password,newPassword}= req.body
    // const {id} = req.params;
    const currentUser = req.user.id
    const user = await User.scope('withpassword').findByPk(currentUser)
    if(!user){
        throw new AppError('user not found',404)
    }
    if (!password) {
        throw new AppError('Please provide your current password to update your profile', 400);
    }

    const verifyUser = await bcrypt.compare(password, user.password);
    if(!verifyUser){
        throw new AppError('Unauthorized',401);
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (newPassword) {
        user.password = await bcrypt.hash(newPassword, 10);
    }
    await user.save();
    res.status(200).json({message:'user updated successfully' })
}


export const deleteUser =async(req,res)=>{
    // const {id}= req.params
    const id =req.user.id
    const user =await User.findByPk(id)
    // console.log(user)
    if(!user){
        throw new AppError('user not found', 409);
    }
    await user.destroy();
    res.status(200).json({message:"user deleted successfully"})
}

export const login = async (req, res)=>{
    const { email , password} = req.body;
    const user = await User.scope('withpassword').findOne({where:{email}});
    if(!user){
        throw new AppError('user not found',404);
    }
    const matched =await bcrypt.compare(password , user.password);
    if(!matched){
        throw new AppError('incorrect Password',401);
    }
    const accessToken = jwt.sign({id:user.id , role: user.role},process.env.JWT_ACCESS_SECRET,{expiresIn:'15m'})
    const refreshToken = jwt.sign({id:user.id , role:user.role}, process.env.JWT_REFRESH_SECRET, {expiresIn:'7d'})
    res.cookie('jwt',refreshToken,{
        httpOnly:true,
        maxAge: 1000*60*60*24*7
    })
    res.status(200).json({accessToken , email:user.email, name: user.name})

}

export const refresh = async (req,res)=>{
    const cookie = req.cookies;
    if(!cookie?.jwt){
        throw new AppError('unauthorized',401);
    }
    const refreshToken = cookie.jwt
    let decrypted
    try{
        decrypted = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET)
    }catch(err){
        throw new AppError(err.message,401)
    }
    const accessToken = jwt.sign({id:decrypted.id , role:decrypted.role},process.env.JWT_ACCESS_SECRET,{expiresIn:'15m'})
    res.status(200).json({accessToken})

}

export const logout = async(req,res)=>{
    const cookie = req.cookies;
    if(!cookie?.jwt){
        return res.status(200).json({ message: "Logged out successfully" });
    }
    res.clearCookie('jwt',{
        httpOnly:true,
        // secure: true,  //
        // sameSite: 'None'
    })
    res.status(200).json({message:"logged out successfully"})
}

export const makeUserAdmin = async(req,res)=>{
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
        throw new AppError('User not found', 404);
    }
    user.role = 'admin';
    await user.save();

    res.status(200).json({ message: 'User is admin now!', user });
}