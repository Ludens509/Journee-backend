
import express from "express";
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
// Allow getting posts by user and deleting all posts for a userId
router.route("/user/:userId").get(protect, postCTRL.getPostByUser)
.delete(protect, postCTRL.deletePostByUser);

//Get posts by Id----------------------------------------------
//@route: /api/posts/:id
//@desc: GET posts by id
//@access: Public
router.route('/:id').get(protect, postCTRL.getPostById);


//Update post by Id-----------------------------------------------
//@route /api/posts/:id/edit
// @desc PUT update a post
// Get single post by id


// router.route('/:id/edit').put(protect, postCTRL.updatePostById)


    //Delete post by Id---------------------------------------------
    //@route /api/posts
    // @desc delete a post

router.route('/:id/edit').put(protect, postCTRL.updatePostById);

//Delete post by Id---------------------------------------------
//@route DELETE /api/posts/:id
//@desc delete a post
//@access Private
router.route('/:id').delete(protect, postCTRL.deletePostById);

export default router;
