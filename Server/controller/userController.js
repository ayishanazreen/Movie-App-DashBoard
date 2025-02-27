const Users = require('../models/UserModel');
const bcrypt=require('bcrypt');
const { generateAccessToken } = require('../utils/jwt');
const { generateVerificationCode } = require('../utils/verificationCode');
const { sendPasswordResetNodeMailer } = require('../utils/sendPasswordResetNodeMailer');

// const { generateAccessToken, verifyRefreshToken } = require('../utils/jwt');
// const { generateRefreshToken } = require('../utils/jwt');
let verification_data={}

const signup =async(req,res)=>{
    try 
    {
       const {name, email, username, password}=req.body;
       if(!name|| !email || !username || !password){
        return res.json({message:"All fields are required"})
       }
       let user=await Users.findOne({username});
       if(user)
           return res.json({message: "User already Exist"});

        const hashedPassword=await bcrypt.hash(password, 10);

       user = await Users.create({name, email, username, password:hashedPassword, role:"user"});
       res.status(201).json({message: "Account is created", 
        user: {
            _id:user._id,
            username:user.username,
            email:user.email,
            role:user.role,
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
        const accessToken=generateAccessToken(users._id, {role:users.role});
        res.status(200).json({message:"Logged In",_id:users._id, username:users.username, role:users.role, accessToken});
        
    } catch (error) {
        console.log(error);
        
    }
   
 
}


const forgotPassword=async(req, res)=>{
    try {
        //console.log(req.body.data.email, "=========req.body")
        const email =req.body.data.email;
        const user= await Users.findOne({email :email}) 
    
        if(!user){
            res.status(404).json({message:"User is not exist with this email"});
            return;
        }
    
        const verificationCode= generateVerificationCode();
    
         verification_data[user._id]=verificationCode;
         console.log("Stored verification data after setting:", verification_data);
         const respo= await sendPasswordResetNodeMailer(email, verificationCode);
         res.json(respo)
        
    } catch (error) {
        console.log(error)
        
    }
}

const resetPassword=async(req,res)=>{
    try {
        const {resetPassword, resetCode}= req.body.data;
        // console.log("Current verification_data:", verification_data); // Log the verification data
        // console.log("Reset code received:", resetCode, "Type:", typeof resetCode);
        //console.log("Stored verification_data:", verification_data);

        // const userId = Object.keys(verification_data).find(
        //     key => verification_data[key] == resetCode // This line could still match if they are coerced. can use for loop . foreach loop and object.entires
        // );

        let userId=null;

        Object.keys(verification_data).forEach(key => {
            console.log("Checking key:", key, "with value:", verification_data[key]);
            if(verification_data[key].toString()=== resetCode){
                console.log(key, "==key")
                userId=key;
            }
        });
         console.log("Matched userId from stored data:", userId);

        if (!userId) {
            return res.status(400).json({ message: "You entered the wrong code" });
        } 
    
            const hashPassword=await bcrypt.hash(resetPassword, 10);
            const update= await Users.findByIdAndUpdate(userId, {password:hashPassword }, {new:true});
            delete verification_data[userId];
            return res.json({ message: "Password reset successful", update });    
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" });
        
    }

}

module.exports={signup, login, forgotPassword, resetPassword}