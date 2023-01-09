import User from "../model/User.js";
import bcrypt from "bcryptjs"

export const getAllUser = async (req,res,next)=>{
    let users;
    try{
        users = await User.find();
    }
    catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message: "No users found!"})
    }
    return res.status(200).json({users});
}

export const getUserById = async (req,res,next)=>{
    const id = req.params.id;
    let user;
    try{
        user = await User.findById(id);
    }catch(err){
        console.log(err)
    }
    if(!user){
        return res.status(404).json({message:"No user found"})
    }
    return res.status(200).json({user})

}


export const signup = async (req,res,next)=>{
    const {name, nickname, email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email})
    }catch(err){
        return console.log(err)
    }
    if(existingUser){
        return res.status(400).json({message:"User already exits!"})
    }
    const hashPassword = bcrypt.hashSync(password);

    const user = new User({
        name,
        nickname,
        email,
        password: hashPassword,
        tries:[],
    });
    try{
       const newUser = await user.save();
       return res.status(201).json({newUser})

    }catch(err){
        return console.log(err)
    }

}

export const login = async (req,res,next)=>{
    const {email, password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
        !existingUser && res.status(400).json("Wrong username or password")
    }catch(err){
        return console.log(err)
    }
    if(!existingUser){
        return res.status(404).json({message:"Couldn't find user with this mail!"})
    }
    const isCorrectPassword = bcrypt.compareSync(password, existingUser.password);
    if (!isCorrectPassword){
        return res.status(400).json("Wrong username or password")
    return res.status(200).json({message:"Login successful!", user: existingUser})


   
    }
}

