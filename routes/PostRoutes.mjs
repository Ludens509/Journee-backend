
import express from "express";
import Post from "../models/postModel.mjs"
import postCTRL from "../controllers/postController.mjs";
import { protect } from "../middlewares/basicAuth.mjs";

const router = express.Router();





//@route POST /api/posts
//@route register a post
//@access Public
router.route("/").post(
    protect, postCTRL.createNewPost)

    //Get All posts-------------------------------------------------
    //@route GET /api/posts
    //@desc Get all posts
    //@access Public
    .get(postCTRL.getAllPosts);


//Get posts by user----------------------------------------------
//@route: /api/posts/user/:userId
//@desc: GET posts by user
//@access: Public
router.route("/user/:userId").get(protect, postCTRL.getPostByUser);


//Update post by Id-----------------------------------------------
//@route /api/posts/:id
// @desc PUT update a post
router.route('/:id').put(protect, postCTRL.updatePostById)


    //Delete post by Id---------------------------------------------
    //@route /api/posts
    // @desc delete a post
    //@Access Public

    .delete(protect, postCTRL.deletePostById);

//Delete post by User--------------------------------------------
//@route /api/posts/user/:userId
// @desc delete a post bu user
//@Access Public
router.route('/user/:userId').delete(protect, postCTRL.deletePostByUser);


export default router;