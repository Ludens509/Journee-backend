import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //Reference to the User Model
        required: true,
        
        validate: {
        validator: async function (userId) {
          const user = await mongoose.models.User.findById({ _id: userId });
          return !!user; // if user exists continue, else throw error
        },
        message: (props) =>
          `This user with ${props.path}:${props.value} does not exist`,
      },
       index: true, //Simple single key index
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