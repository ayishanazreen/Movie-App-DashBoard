const jwt=require("jsonwebtoken")

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
module.exports={checkAuth}
