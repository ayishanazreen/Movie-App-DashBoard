const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true

    },
    email:{
        type:String,
        required:true,
        trim:true

    },
    username:{
        type:String,
        required:true,
        trim:true
    },

    password:{
        type:String,
        required:true,
        trim:true
    },
    watchLater: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Movie'
     }],
     role: { type: String, default: 'user' },
    
});


const User=mongoose.models.User || mongoose.model("User", userSchema);
module.exports=User;