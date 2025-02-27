const jwt=require("jsonwebtoken");
const User = require("../models/UserModel");

 const checkAuth=(req,res, next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({message:"Access denied"})
        }
        const tokenVerify=jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // console.log(tokenVerify, "=====verify")
        req.userId=tokenVerify.id;
        next();
        
    } catch (error) {
        if(error.name==="TokenExpiredError"){
            return res.status(401).json({message:"Expired Access TOken"})
        }
        else{
        return res.status(401).json({message:"invalid token"})
        }
        
    }

}

const verifyRole=async(req,res,next)=>{
    try {
        const user=await User.findById(req.userId);
        if(!user || user.role !=="admin"){
            return res.status(403).json({message:"Only Admins are allowed"})
        }
        next();
        
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }

}

module.exports={checkAuth, verifyRole}
