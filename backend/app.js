const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer=require('multer');
require("dotenv").config();
const app=express();

app.use(bodyParser.json());
app.use(cors());

const userRoute=require('./routes/user');
const postRoute=require('./routes/post');

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
  })

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null , './uploads')
    },
    filename: (req,file,cb)=>{
      cb(null, Date.now() + '-' + file.originalname )
    }
})

app.use(multer({storage: fileStorage}).single('file'))
app.use(userRoute);
app.use(postRoute);
app.use('/uploads',express.static('uploads'));

mongoose.connect(
  process.env.MONOGO_DB_URI
)
.then(result => {
    app.listen(8080)
    console.log(`Server is Running on PORT 8080`)
})
.catch(err => {
    console.log(err)
})