import mongoose from "mongoose";
import Try from "../model/Try.js";
import User from "../model/User.js";


export const getAllTries = async (req,res,next)=>{
    let tries;
    try{
        tries = await Try.find().populate("user"); 
    }
    catch(err){
        console.log(err);
    }
    if(!tries){
        return res.status(404).json({message:"No tries found!"})
    }
    return res.status(200).json({tries})


}

export const addTry = async (req,res,next)=>{
    const {questions,money, percentage, status, user} = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user);
    } catch (err){
        return console.log(err)
    }
    if (!existingUser){
        return res.status(400).json({message: "Unable to find userID"})
    }
    const tri = new Try({
        questions,money, percentage, status, user
        });

    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await tri.save({session});
        existingUser.tries.push(tri);
        await existingUser.save({session})
        await session.commitTransaction();
    }
    catch(err){
    //    return console.log(err);
       return res.status(500).json({message: err})
    }
    return res.status(200).json({tri})

};


export const deleteTry = async (req,res,next)=>{
    const id = req.params.id;
    let tri;
    try{
        tri = await Try.findByIdAndRemove(id).populate("user");
        await tri.user.tries.pull(tri);
        await tri.user.save();
    }catch(err){
        console.log(err)
    }
    if(!tri){
        return res.status(500).json({message:"Unable to delete"})
    }
    return res.status(200).json({message:"tri deleted"})

}

export const getByUserId = async (req,res,next)=>{
    const userId = req.params.id;
    let userTries;
    try{
        userTries = await User.findById(userId).populate("tries")
    }catch(err){
        return console.log(err)
    }
    if(!userTries){
        return res.status(404).json({message:"No tries found"})

    }
    return res.status(200).json({user:userTries})
}