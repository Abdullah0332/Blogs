const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema= new Schema({
   
    Username:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Date:{
        type : Date,
        required : true
    },
    About:{
        type : String
    },
    posts:[
        {
            type: Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    resetToken: String,
    resetTokenExpire: Date
});

module.exports = mongoose.model('User',userSchema);