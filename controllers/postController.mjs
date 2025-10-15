// import express from 'express';
import Post from "../models/postModel.mjs";
import User from '../models/userModel.mjs';



// Create New Question -------------------------------------------
let createNewPost = async (req, res) => {
        try {
            const { userId, title, content } = req.body;

            if (!userId || !title || !content) {
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
        res.send("Create a post fine with me!!");
    }



//Get all posts---------------------------------------------------
let getAllPosts =  (req, res) => {
    // try {
    //     const getAllPosts = await Post.find({});
    //     if (getAllPosts.length == 0) {
    //         return res.status(404).json({ msg: "Post not found !" });
    //     }
    //     res.json(getAllPosts);
    // } catch (err) {
    //     console.log(err.message);
    //     res.status(500).json({ msg: `Error - ${err.message}` })
    // }
    res.send("get all post fine with me!!");
}

//Get Post by user-----------------------------------------------

let getPostByUser =  (req, res) => {
    // try {
    //     const userId = req.params.userId;

    //     if (!userId) {
    //         return res.status(400).json({
    //             msg: `The user param userId is missing`,
    //         });
    //     }

    //     const posts = await Post.find({ userId: userId });

    //     res.status(201).json(posts);
    // } catch (err) {
    //     console.error(`❌ Error :`, err.message);
    //     res.status(500).json({ msg: `Error - ${err.message}` });
    // }
    res.send("get all post by user fine with me!!");
}


//Update post by Id-----------------------------------------------
let updatePostById =  (req, res) => {

    // try {
    //     const updatePost = await Post.findByIdAndUpdate(
    //         req.params.id,
    //         req.body, {
    //         new: true, //return the updated document
    //         runValidators: true,
    //     }//enables schema validation when updating documents, its false by default
    //     );

    //     //if Post exist
    //     if (updatePost) {
    //         return res.status(400).json({ message: `Post not found` });
    //     }

    //     res.status(201).json(updatePost);

    // } catch (err) {
    //     console.error(`❌ Error :`, err.message);
    //     res.status(500).json({ msg: `Error - ${err.message}` });
    // }
    res.send("update post by user fine with me!!");
}


//Detele post by Id--------------------------------------
let deletePostById =  (req, res) => {
        // try {
        //     const deletePost = await Post.findByIdAndDelete(req.params.id)
        //     console.log("Post deleted successfully:", deletePost);

        //     res.json({
        //         success: true,
        //         message: "Post deleted successfully"
        //     });

        // } catch (err) {
        //     console.error(`❌ Error :`, err.message);
        //     res.status(500).json({ msg: `Error - ${err.message}` });
        // }
        res.send("delete post by Id fine with me!!");
    }

    let deletePostByUser =  (req, res) => {
    // try {

    //     const deletePostByUser = await Post.findByIdAndDelete({
    //         userId: req.params.userId,
    //     });

    //     console.log("Post deleted successfully:", deletePostByUser);

    //     res.json({
    //         success: true,
    //         message: "Post deleted successfully",
    //         deletePostByUser
    //     });

    // } catch (err) {
    //     console.error(`❌ Error :`, err.message);
    //     res.status(500).json({ msg: `Error - ${err.message}` });
    // }
     res.send("delete post by user fine with me!!");

}

export default{
    getAllPosts,
    createNewPost,
    getPostByUser,
    updatePostById,
    deletePostById,
    deletePostByUser,
}