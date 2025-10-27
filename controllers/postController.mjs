// import express from 'express';
import Post from "../models/postModel.mjs";


//@route POST /api/posts
//@route register a post
//@access Public
// Create New Question -------------------------------------------
let createNewPost = async (req, res) => {
    try {
        // const { user, title, content } = req.body;

        // if (!user || !title || !content) {
        //     return res.status(400).json({
        //         msg: `Fields "user", "title", "content" are required`,
        //     })
        // }

        // const userExist = await User.findById(user);

        // if (!userExist) {
        //     return res.status(404).json({
        //         msg: `The user with "${user}" does not exist`
        //     });
        // }

        const post = await Post.create({
            // user,         // 👈 manually provided for now
            // title,
            // content,
            user: req.user._id,
            title: req.body.title,
            content: req.body.content,
            isPrivate: req.body.isPrivate || true,

            new: true, //return the updated document
            runValidators: true,

        }
        );

        res.status(201).json(post);
    } catch (err) {
        console.log(`❌ Error :`, err.message);
        res.status(500).json({ msg: `Error - ${err.message}` })
    }
}



//Get all posts---------------------------------------------------
let getAllPosts = async (req, res) => {
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
}

//Get Post by user-----------------------------------------------

let getPostByUser = async (req, res) => {
    try {
        // const userId = req.user._id;

        // if (!userId) {
        //     return res.status(400).json({
        //         msg: `The user param userId is missing`,
        //     });
        // }

        // const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });

        // if (posts.length == 0) {
        //     return res.status(400).json({
        //         msg: `post not found`,
        //     });
        // }
    const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });

    // return posts (OK)
    return res.status(200).json(posts);
    } catch (err) {
        console.error(`❌ Error :`, err.message);
        res.status(500).json({ msg: `Error - ${err.message}` });
    }
}


//Update post by Id-----------------------------------------------
let updatePostById = async (req, res) => {

    try {
        const postId = req.params.id;

        const post = await Post.findById(postId);

        if (!post || post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized" });
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        const updatePost = await post.save();

        

        res.status(201).json(updatePost);

    } catch (err) {
        console.error(`❌ Error :`, err.message);
        res.status(500).json({ msg: `Error - ${err.message}` });
    }
}


//Detele post by Id--------------------------------------
let deletePostById = async (req, res) => {
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.id)
        console.log("Post deleted successfully:", deletePost);

        res.json({
            success: true,
            message: "Post deleted successfully"
        });

    } catch (err) {
        console.error(`❌ Error :`, err.message);
        res.status(500).json({ msg: `Error - ${err.message}` });
    }
}

let deletePostByUser = async (req, res) => {
    try {

    // Delete all posts that belong to the userId param
    const result = await Post.deleteMany({ user: req.params.userId });

    console.log("Posts deleted for user:", req.params.userId, result);

    res.json({
        success: true,
        message: "Posts deleted successfully",
        deletedCount: result.deletedCount,
    });

    } catch (err) {
        console.error(`❌ Error :`, err.message);
        res.status(500).json({ msg: `Error - ${err.message}` });
    }


}



// Get single post by id----------------------------------------
let getPostById = async (req, res) => {
    try {
        const postId = req.params.id;

        if (!postId) {
            return res.status(400).json({ msg: "Post id is required" });
        }

        const post = await Post.findById(postId).select("-__v");

        if (!post) {
            return res.status(404).json({ msg: "Post not found" });
        }

        return res.status(200).json(post);
    } catch (err) {
        console.error(`❌ Error :`, err.message);
        return res.status(500).json({ msg: `Error - ${err.message}` });
    }
}
export default {
    getAllPosts,
    createNewPost,
    getPostByUser,
    getPostById,
    updatePostById,
    deletePostById,
    deletePostByUser,
}