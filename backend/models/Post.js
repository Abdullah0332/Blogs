const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const postSchema= new Schema({
   
    Title:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    ImageURL: {
        type: String,
        required: true
    },
    Creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
});

module.exports = mongoose.model('Post',postSchema);