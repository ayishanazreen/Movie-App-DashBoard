const mongoose=require("mongoose");


const movieSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5
    },
    genre:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    }],
    imageUrl:{
        type:String,
        required:true
    },
  
}
)

const Movie=mongoose.model("Movie",movieSchema )
module.exports=Movie;