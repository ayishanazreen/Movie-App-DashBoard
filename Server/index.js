const express=require('express');
const cors=require("cors");
const app=express();
require('dotenv').config();
const connectDb =require('./config/db');
const movieRouter =require('./router/movieRouter');
const homeRouter=require('./router/homeRouter');
const genreRouter=require('./router/genreRouter');
const userRouter=require('./router/userRouter');
const { checkAuth } = require('./midleware/checkAuth');

app.use(cors());
app.use(express.json());
app.use(express.static("public"))
connectDb();




//setting routes
app.use('/movies' , movieRouter);
app.use('/home', homeRouter);
app.use('/genre', genreRouter);


app.use('/users', userRouter);



app.listen(process.env.PORT, ()=>{
    console.log(`Server started at ${process.env.PORT}`)
});