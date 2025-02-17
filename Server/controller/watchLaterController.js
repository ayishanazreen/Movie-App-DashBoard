const express = require("express");
const Movie = require("../models/movieModel");
const User = require("../models/userModel");
const { Children } = require("react");

 const addWatchLater = async(req,res) =>{
    try {
        const {movieId}=req.body;
        const userId=req.userId;
        const user=await User.findByIdAndUpdate(
            userId,
            {$addToSet : { watchLater: movieId}},
            {new:true}
        ).populate("watchLater")
      if(!user){
        return res.status(404).json({message:"user not found"})

      }
      return  res.status(200).json({message:"movie added to watch later", user})
        
    } catch (error) {
        return res.status(500).json({message:"Server error"})
        
    }
}

const fetchWatchLater=async(req, res)=>{
    try {  
    const userId=req.userId;
    const user =await User.findById(userId)
    .populate({path: "watchLater",
        populate:{
            path:'genre',
            model:'Genre',
        }
    });
    if(!user){
        return res.status(404).json({message:"user not found"})
    }
    return res.json({user})
        
    } catch (error) {
        console.error("Fetch Watch Later Error:", error);  // Log the full error
        return res.status(500).json({ message: "Server error", error: error.message });
        
    }
}

const deleteWatchLaterController=async(req,res)=>{
    try {

        const movieId =req.params.id;
        console.log(movieId, "movie id from backend")
        const userId=req.userId;
        if(!movieId || !userId){
         return res.status(400).json({message:"movie Id and user Id are required"})
        }
     
        const updatedUser=await User.findByIdAndUpdate(
         userId,
         {$pull : {watchLater: movieId}},
         {new:true}
        ).populate("watchLater");


       //console.log(updatedUser,"updated user on backend ");

        if(!updatedUser){
         return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({message:"deleted"})
        
    } catch (error) {
        console.log(error, "error in remove watch later ")
        return res.status(500).json({message:"server error"})
        
    }
  
  
}

module.exports={addWatchLater, fetchWatchLater, deleteWatchLaterController}