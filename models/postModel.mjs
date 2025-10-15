import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //Reference to the User Model
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    isPrivate: {
        type: Boolean,
        default: true,      // default: private diary entry
    },
},
    { timestamps: true }
);

 const Post = mongoose.model("Post", postSchema);

 export default Post;