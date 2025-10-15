
import express from "express";
import Post from "../models/postModel.mjs"
import postCTRL from "../controllers/postController.mjs";

const router = express.Router();





//@route POST /api/posts
//@route register a post
//@access Public
router.route("/").post(
    postCTRL.createNewPost)

//Get All posts-------------------------------------------------
    //@route GET /api/posts
    //@desc Get all posts
    //@access Public
    .get(postCTRL.getAllPosts);


//Get posts by user----------------------------------------------
//@route: /api/posts/user/:userId
//@desc: GET posts by user
//@access: Public
router.route("/user/:userId").get(postCTRL.getPostByUser);


//Update post by Id-----------------------------------------------
//@route /api/posts/:id
// @desc PUT update a post
router.route('/:id').put(postCTRL.updatePostById)


//Delete post by Id---------------------------------------------
    //@route /api/posts
    // @desc delete a post
    //@Access Public

    .delete(postCTRL.deletePostById);

//Delete post by User--------------------------------------------
//@route /api/posts/user/:userId
// @desc delete a post bu user
//@Access Public
router.route('/user/:userId').delete(postCTRL.deletePostByUser);


export default router;