const express=require("express")
const router=express.Router();
const Movie = require("../models/movieModel");
const multer=require("multer");
const { checkAuth, verifyRole } = require("../midleware/checkAuth");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage })


router.post('/' ,upload.single('image'), async(req,res)=>{
    try {
    const {title, rating, genre}=req.body;
    const image=req.file? `/images/${req.file.filename}` : null;
    if(!title || !rating || !genre.trim() || !image){
        return res.status(400).json({ error: "Movie data is required" });
    }
    const genresArray = genre.split(',').map(item => item.trim()).filter(Boolean);  // Remove empty genres

        if (genresArray.length === 0) {
            return res.status(400).json({ error: "At least one genre must be provided" });
        }

    const newMovie=  new Movie({
        title,
        rating:Number(rating),
        genre:genre.split(',').map(item => item.trim()),
        imageUrl:image
    });
    await newMovie.save();
    
    console.log(newMovie, "new movie object.................")
    res.status(200).json( {
        message:"Movie Added Successfully", movie:newMovie} );

    } catch(error) {
        console.error("Error:", error);
        res.status(500).json({message:error.message, error: "Server error" });
    }
    
})



router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id).populate('genre');
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.json(movie);
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/:id', async(req,res)=>{
    try {
    const {id}=req.params;
    const deletedMovie=await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
        return res.status(404).json({ message: "Movie not found" });
      }
  
      res.status(200).json({ message: "Movie deleted successfully" });
        
    } catch (error) {
        console.log(error)
        
    }
    

})


module.exports=router;
