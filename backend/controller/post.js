const Post = require('../models/Post');
const User = require('../models/User');

exports.createPost = (req, res, next) => {
    const title= req.body.title
    const description= req.body.description;
    const imageUrl= req.file  

    const post = new Post({
        Title: title,
        Description: description,
        ImageURL: imageUrl.path, 
        Creator: req.userId
    })
    post.save()
        .then(result=> {
            return User.findById(req.userId)
        })
        .then(user => {
            creator = user;
            user.posts.push(post)
            return user.save()
        })
        .then(result=> {
            res.json({
                message: 'Post Created Successfully', 
                post: post,
                creator: {_id: creator._id, name: creator.name}
            })
        })
        .catch(err => console.log(err))
}

exports.Posts = (req, res, next) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => console.log(err))
}


exports.singlePost = (req, res, next) => {
    const postId = req.params.postId;

    Post.findOne({_id: postId})
        .then(post => {
            // console.log(post)
            res.json({post})
        })
        .catch(err => {
            console.log(err)
        })
}

exports.UpdatePost = (req, res, next) => {
    const updatetitle= req.body.title;
    const updatedescription= req.body.description;
    const updateimageUrl= req.file.path;
    const postId = req.params.postId;
    
    Post.findOne({_id: postId})
        .then(post => {

            post.Title= updatetitle;
            post.Description= updatedescription;
            post.ImageURL= updateimageUrl;

            res.json({post})
            return post.save();
        })
        .catch(err => {
            console.log(err)
        })
}

exports.deletePost = (req, res, next) => {
console.log(req.params.postId)
    Post.findByIdAndDelete(req.params.postId)
        .then(() => res.json({ message: 'Post Deleted'}))
        .catch(err => res.json('Error : ',err))
}