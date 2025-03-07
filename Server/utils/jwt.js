const jwt=require("jsonwebtoken");

const generateAccessToken=(userId)=>{
    return jwt.sign({id:userId, role:userId.role}, process.env.ACCESS_TOKEN_SECRET)
}

module.exports={generateAccessToken}