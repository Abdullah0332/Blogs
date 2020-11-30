const express= require('express');  

const router = express.Router();

const isAuth = require('../middleware/isAuth')

const Controller = require('../controller/post');

router.post('/post/update/:postId',isAuth, Controller.UpdatePost);

router.post('/createpost', isAuth, Controller.createPost);

router.get('/posts', isAuth, Controller.Posts);

router.get('/post/:postId', isAuth, Controller.singlePost);

router.delete('/delete/:postId', Controller.deletePost);

module.exports = router;