import mongoose from "mongoose";
import express from "express";
import Post from "../models/postModel.mjs"

const router = express.Router();


//@route GET /api/posts
//@desc Get all posts
//@access Public
router.route("/").get(async (req, res) => {
    try {
        const getAllPosts = await Post.find({});
        if (getAllPosts.length == 0) {
            return res.status(404).json({ msg: "Post not found !" });
        }
        res.json(getAllPosts);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: `Error - ${err.message}` })
    }
})

    //@route POST /api/posts
    //@route register a post
    //@access Public
    .post(async (req, res) => {
        try {
            const { userId, title, content } = req.body;

            if (userId || title || content) {
                return res.status(400).json({
                    msg: `Fields "userId", "title", "content" are required`,
                })
            }

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({
                    msg: `The userId with "${userId}" does not exist`
                });
            }

            const post = await Post.create(req.body);

            res.status(201).json(post);
        } catch (err) {
            console.log(`❌ Error :`, error.message);
            res.status(500).json({ msg: `Error - ${err.message}` })
        }
    });

//Get posts by user----------------------------------------------

router.route("/:id").get(async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({
                msg: `The user param userId is missing`,
            });
        }

        const posts = await Post.find({ userId: userId });

        res.status(201).json(posts);
    } catch (err) {
        console.error(`❌ Error :`, err.message);
        res.status(500).json({ msg: `Error - ${err.message}` });
    }
})

//Update post by Id-----------------------------------------------

router.route('/:id').put(async (req, res) => {

    try {
        const updatePost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body, {
            new: true, //return the updated document
            runValidators: true,
        }//enables schema validation when updating documents, its false by default
        );

        //if Post exist
        if (updatePost) {
            return res.status(400).json({ message: `Post not found` });
        }

        res.status(201).json(updatePost);
    } catch (err) {
        console.error(`❌ Error :`, err.message);
        res.status(500).json({ msg: `Error - ${err.message}` });
    }
});

