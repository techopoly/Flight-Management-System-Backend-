const { validationResult } = require('express-validator/check');

const post_M = require('../model/post_M');



const getPostsController = async (req, res, next) => {

    const result = await post_M.Post.getPosts();
    res.status(200).json({
        message: 'successful',
        data: result
    });

}


const createPostController = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed',
            error: error.array()
        })
    }


    console.log(req.body);
    const post_content = req.body.post_content;
    const username = req.body.username;
    const image = req.file.path.replace("\\", "/");
    const vote = req.body.vote;
    //.replace("\\" ,"/")
    if (!image) {
        return res.status(422).json({
            message: 'image not attached'
        })
    }
    console.log()
    const post = new post_M.Post(post_content, username, image, vote);
    const result = await post.createPost();

    res.status(200).json({
        message: 'successfully posted',
        data: result.result,
        post: result.post,
        createdAt: new Date()
    })
}


const getSinglePost = async (req, res, next) => {
    const id = req.query.id;
    const result = await post_M.Post.findById(id);
    if (result.length == 0) {
        return res.status(404).json({
            message: 'no post found'
        })
    }
    res.status(200).json({
        message: 'successfully fetched single',
        data: result
    })
}


const editPostController = async (req, res, next) => {
    const id = req.query.id;

    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            message: 'validation failed',
            error: error.array()
        })
    }


    console.log(req.body);
    const post_content = req.body.post_content;
    const username = req.body.username;
    let image = req.body.image;
    const vote = req.body.vote;
    if (req.file) {
        image = req.file.path.replace("\\", "/");
    }
    if (!image) {
        return res.status(422).json({
            message: 'image not attached'
        })
    }
    console.log()
    const result = await post_M.Post.findById(id);
    if (result.length == 0) {
        return res.status(404).json({
            message: 'no post found'
        })
    }
    const editedPost = await post_M.Post.editPost(id, post_content, username, image, vote);
    res.status(200).json({
        message: 'successfully edited post',
        data: editedPost,
        post: {
            post_content : post_content,
            username : username,
            image : image,
            vote : vote,
            id :id
        }
    })

}


const deletePostController = async (req, res, next)=>{

    const id = req.query.id;
    const result = await post_M.Post.deletePost(id);

    if (result.length == 0) {
        return res.status(404).json({
            message: 'no post found'
        })
    }
    res.status(200).json({
        message: 'successfully deleted post',
        data: result
    })
        

}

exports.getPostsController = getPostsController;
exports.createPostController = createPostController;
exports.getSinglePost = getSinglePost;
exports.editPostController = editPostController;
exports.deletePostController = deletePostController;
