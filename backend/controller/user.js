const User= require('../models/User');
const { validationResult }=require('express-validator/check');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');
const jwt= require('jsonwebtoken');
const crypto= require('crypto');

// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL || 'abc@gmail.com', // TODO: your gmail account
//         pass: process.env.PASSWORD || 'password' // TODO: your gmail password
//     }
// });

exports.Users = (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.json("Error : ",err))
}

exports.singleUser = (req, res, next) => {
    const userId = req.params.userId;

    User.findOne({_id: userId})
        .then(user => {
            res.json({user})
        })
        .catch(err => {
            console.log(err)
        })
}

exports.updateUser = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const about = req.body.about;
    const userId = req.params.userId;

    User.findOne({_id: userId})
        .then(user => {
            user.Username= username;
            user.Email= email;
            user.About= about;
            res.json({user})
            return user.save()
        })
        .catch(err => {
            console.log(err)
        })
}

exports.signup = (req, res, next) => {    
    const Username= req.body.username;
    const Email= req.body.email;
    const Password= req.body.password;
    const date = Date.parse(req.body.date);

    const error= validationResult(req)
    if(!error.isEmpty()){
        console.log(error.array()[0].msg)
        return res.json({message: error.array()[0].msg })
    }
    
    bcrypt.hash(Password, 16)
    .then(hashpassword => {
        const newUser = new User({
            Username: Username,
            Email: Email,
            Password: hashpassword,
            Date: date
        })
        return newUser.save()
    })
    .then(() => {
        res.status(201).json({message : "User Signup Successfully"})
        // return transporter.sendMail({
        //     to: Email,
        //     from: 'abc@gmail.com',
        //     subject: "Signup Succeeded",
        //     html: '<h1>You Successfully SignUp</h1>'
        // })
    })
    .catch(error => console.log(error))
}

exports.Login = (req, res, next) => {

    const error= validationResult(req)
    if(!error.isEmpty()){
        return res.json({message: error.array()[0].msg })
    }
    const Email= req.body.email;
    const Password= req.body.password;

    User.findOne({ Email:Email })
    .then(user => {
        if(!user){
            return res.json({message : "User Not Exist Sign Up First"})
        }
        bcrypt.compare(Password, user.Password)
        .then(match => {
            if(match){
                const token=jwt.sign({
                    email:user.Email,
                    userId:user._id.toString()
                }, process.env.JWT_KEY,
                {expiresIn:'1h'});
                return res.status(201).json({message : "User Login Successfully" , token:token, userId:user._id, username: user.Username, email: user.Email })
            }
            return res.json({message: "Wrong Password" })
        })
    })
    .catch(error => 
        res.json({message : "User Login Successfully" , auth: true})
    )
}

exports.reset = (req, res, next) => {

    const error= validationResult(req)
    if(!error.isEmpty()){
        return res.json({message: error.array()[0].msg })
    }

    crypto.randomBytes(32, (err, Buffer) => {
        if(err){
            console.log("Buffer : ", err)
        }
        const token= Buffer.toString('hex');
        User.findOne({Email: req.body.email})
            .then(user=>{
                if(!user){
                    res.json({message: "User Not Exist"})
                }
                user.resetToken= token;
                user.resetTokenExpire= Date.now()+360000;
                return user.save();
            })
            .then(result => {
                res.status(201).json({message : "Reset Password Token Send Successfully Check your Mail"})
                // transporter.sendMail({
                //     to: req.body.email,
                //     from: 'abc@gmail.com',
                //     subject: "Password Reset",
                //     html: `
                //     <h1>Your Request to Reset Password</h1>
                //     <p>Click here to Reset your password</p>
                //     <a href="http://localhost:3000/reset/${token}">Click here</a>
                //     `
                // })
            })
            .catch(err => {
                console.log(err)
            })
    })
}

exports.NewPassword = (req, res, next) => {
    const token= req.params.token;
    const NewPassword=req.body.password;
    let resetuser;

    User.findOne({resetToken: token})
        .then(user => {
            resetuser=user
            if(user == null){
                res.json('Password link is invalid or has expired');
            }
            return bcrypt.hash(NewPassword, 16);
        })
        .then(hashpassword=>{
            resetuser.Password=hashpassword;
            resetuser.resetToken= undefined;
            resetuser.resetTokenExpire=undefined;
            return resetuser.save();
        })
        .then(result=>{
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deleteUser = (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
        .then(() => res.json({ message: 'User Deleted'}))
        .catch(err => res.json('Error : ',err))
}