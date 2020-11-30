const express= require('express');

const User= require('../models/User');

const router = express.Router();

const { check }=require('express-validator/check')

const Controller = require('../controller/user');

router.get('/users', Controller.Users);

router.get('/user/:userId', Controller.singleUser);

router.post('/user/update/:userId', Controller.updateUser);

router.post('/Signup', [
    check('email')
        .isEmail()
        .withMessage('Please Enter a valid Email')
        .custom((value,{req})=>{
            return User.findOne({Email : value})
          .then(UserDoc=>{
              if (UserDoc){
                return Promise.reject('Email already exist, Please Enter other one');
              }
          })
        }),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Please Enter a password with only number and text atleast 5 characters')
        .isAlphanumeric()

], Controller.signup);

router.post('/Login' ,[
  check('email')
        .isEmail()
        .withMessage('Please Enter a valid Email')
], Controller.Login);

router.post('/reset', [
  check('email')
        .isEmail()
        .withMessage('Please Enter a valid Email')
], Controller.reset);

router.post('/reset/:token', Controller.NewPassword);

router.delete('/delete/:userId', Controller.deleteUser);

module.exports = router;