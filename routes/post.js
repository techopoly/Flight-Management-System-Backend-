const express = require('express');
const { body } = require('express-validator/check');

const post_C = require('../controller/post_C');
const isAuth = require('../middleware/is-auth');



const router = express.Router();


router.get('/getPosts', post_C.getPostsController);

router.post('/createPost', isAuth, [
    body('post_content')
        .trim()
        .isLength({
            min: 5
        }),
    body('username')
        .trim()
        .isLength({
            min: 1
        })
], post_C.createPostController);

router.post('/editPost', isAuth, [
    body('post_content')
        .trim()
        .isLength({
            min: 5
        }),
    body('username')
        .trim()
        .isLength({
            min: 1
        })
], post_C.editPostController);


router.get('/getSinglePost', post_C.getSinglePost);

router.post('/deletePost',isAuth, post_C.deletePostController);




module.exports = router;