const express=require("express")
const router=express.Router();
const Movie = require("../models/movieModel");
const multer=require("multer");
const User = require("../models/userModel");
const { checkAuth } = require("../midleware/checkAuth");
const {addWatchLater, fetchWatchLater, deleteWatchLaterController}=require('../controller/watchLaterController')

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




router.get('/',checkAuth,async(req,res)=>{
    try {
      const movies= await Movie.find().populate("genre", "name");
      //console.log(req.userId)
      const user=await User.findById(req.userId)
      res.json({movies, user});
        
    } catch (error) {
      res.status(500).json({
        message:"Error fetching Movies", error
      });
        
    }

})



router.put('/edit/:id', checkAuth, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, rating, genre } = req.body;
        console.log(req.body, "========req.body")

        // Get the existing movie data
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        const genresArray = genre.split(',');

        // Create an object to hold the updated fields
        let updateFields = {};

        // Only update fields that are provided in the request
        if (title) {
            updateFields.title = title;
        }

        if (rating) {
            updateFields.rating = rating;
        }

        if (genre) {
          updateFields.genre = genresArray; // Convert genre string to array
        }

        // Handle image upload
        if (req.file) {
            updateFields.imageUrl = `/images/${req.file.filename}`;
        }

        // Update the movie in the database with only the fields that have changed
        const updatedMovie = await Movie.findByIdAndUpdate(id, updateFields, { new: true });

        res.json(updatedMovie); // Send the updated movie back to the frontend
        console.log(updatedMovie, "movie updated backend");
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});


router.put('/watch-later', checkAuth, addWatchLater);

router.get('/watch-later', checkAuth, fetchWatchLater);

router.delete('/watch-later/:id', checkAuth, deleteWatchLaterController)



module.exports=router;