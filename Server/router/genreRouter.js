const express=require("express")
const router=express.Router();
const Genre = require("../models/genreModel");




router.post('/', async(req,res)=>{
    try {
        const {genre}=req.body;
        if(!genre){
           return res.status(404).json( "require genre" ); 
        }

        const existingGenre=await Genre.findOne({name: genre})
        if(existingGenre){
            res.status(409).json("Genre already exists")
        }

        const newGenre= await Genre({name:genre});
        await newGenre.save();
        // if(genres.some((gen) => gen ===genre)){
        //     res.json("it is already added")
       res.status(201).json({message: "Genre Added Successfully", genre:newGenre})
        
    } 
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
})

router.get('/', async (req, res) => {
    try {
        // Fetch all genres from the database
        const genres = await Genre.find();

        if (genres.length === 0) {
            return res.status(404).json({ message: "No genres found" });
        }

        // Respond with the list of genres
        res.status(200).json({ message: "Fetched all genres", genres });

    } catch (error) {
        console.error("Error fetching genres:", error);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete('/', async(req,res)=>{
  
        const {genre} = req.query;
        const deletedGenre= await Genre.findOneAndDelete({name:genre} );
            if (!deletedGenre){
                return res.status(500).json({message:"error in deleting genre"})
            }
            const updatedGenre= await Genre.find({});
            res.json({message:"Genre deleted Successfully", genres:updatedGenre }); 
               
            });

module.exports=router;