// import express from 'express';
import Post from "../models/postModel.mjs";
import User from '../models/userModel.mjs';



// Create New Question -------------------------------------------
let createNewPost = async (req, res) => {
    try {
        const { user, title, content } = req.body;

        if (!user || !title || !content) {
            return res.status(400).json({
                msg: `Fields "user", "title", "content" are required`,
            })
        }

        // const userExist = await User.findById(user);

        // if (!userExist) {
        //     return res.status(404).json({
        //         msg: `The user with "${user}" does not exist`
        //     });
        // }

        const post = await Post.create({
            user,         // 👈 manually provided for now
            title,
            content,
            
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
let getAllPosts = async(req, res) => {
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

let getPostByUser = async(req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).json({
                msg: `The user param userId is missing`,
            });
        }

        const posts = await Post.find({ user: userId }).sort({createdAt: -1});

        if(posts.length ==0){
             return res.status(400).json({
                msg: `post not found`,
            });
        }

        res.status(201).json(posts);
    } catch (err) {
        console.error(`❌ Error :`, err.message);
        res.status(500).json({ msg: `Error - ${err.message}` });
    }
}


//Update post by Id-----------------------------------------------
let updatePostById = async(req, res) => {

    try {
        const postId = req.params.id;
        const {user,title,content} = req.body;
        //const updatePost = await Post.findByIdAndUpdate(
         //   postId,
         //    req.body, //{
        //     new: true, //return the updated document
        //     runValidators: true,
        // }//enables schema validation when updating documents, its false by default
        //);

         // Check if another post has the same title (excluding current post)
            const existingPost = await Post.findOne({
                title: title,
                _id: { $ne: postId }
            });

            if (existingPost) {
                return res.status(400).json({
                    success: false,
                    message: "A post with this title already exists"
                });
            }
             let updatePost = await Post.findByIdAndUpdate(
                postId, {
                 user:user,   
                title: title,
                content: content,  
            },
                {
                    new: true,
                    runValidators: true
                }
            );
        //if Post exist
        if (!updatePost) {
            return res.status(400).json({ message: `Post not found` });
        }

        res.status(201).json(updatePost);

    } catch (err) {
        console.error(`❌ Error :`, err.message);
        res.status(500).json({ msg: `Error - ${err.message}` });
    }
}


//Detele post by Id--------------------------------------
let deletePostById = async(req, res) => {
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

let deletePostByUser = async(req, res) => {
    try {

        const deletePostByUser = await Post.findByIdAndDelete({
            user: req.params.userId,
        });

        console.log("Post deleted successfully:", deletePostByUser);

        res.json({
            success: true,
            message: "Post deleted successfully",
            deletePostByUser
        });

    } catch (err) {
        console.error(`❌ Error :`, err.message);
        res.status(500).json({ msg: `Error - ${err.message}` });
    }
   

}

export default {
    getAllPosts,
    createNewPost,
    getPostByUser,
    updatePostById,
    deletePostById,
    deletePostByUser,
}