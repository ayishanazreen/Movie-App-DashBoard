const Users = require('../models/userModel');
const bcrypt=require('bcrypt');
const { generateAccessToken } = require('../utils/jwt');

// const { generateAccessToken, verifyRefreshToken } = require('../utils/jwt');
// const { generateRefreshToken } = require('../utils/jwt');


const signup =async(req,res)=>{
    try 
    {
       const {name, email, username, password}=req.body;
       if(!name|| !email || !username || !password){
        return res.json({message:"All fielda are required"})
       }
       let user=await Users.findOne({username});
       if(user)
           return res.json({message: "User already Exist"});

        const hashedPassword=await bcrypt.hash(password, 10);

       user = await Users.create({name, email, username, password:hashedPassword});
       res.status(201).json({message: "Account is created", 
        user: {
            _id:user._id,
            username:user.username,
            email:user.email,
        },
    });
    
    } 
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

const login = async(req,res)=> { 
    try {
        const {username, password}=req.body;
        let users=await Users.findOne({username});
        if(!users)
           return res.status(400).json({message: "username/password is not valid"});
    
        const valid=await bcrypt.compare(password, users.password);
        if(!valid){
            return res.status(400).json({message: "username/password is not valid"});
        }
         
    //     const accessToken=generateAccessToken(users._id);
    //     const refreshToken= generateRefreshToken(users._id);
    //     res.cookie("refreshToken", refreshToken, {
    //     httpOnly:true,
    //     secure:true,
    //    })
        const accessToken=generateAccessToken(users._id);
        res.status(200).json({message:"Logged In",_id:users._id, username:users.username, accessToken});
        
    } catch (error) {
        console.log(error);
        
    }
   
 
}

module.exports={signup, login}