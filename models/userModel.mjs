import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    bio: {
        type: String,
        default: "",
    }
},
    { timestamps: true }
)

export default mongoose.model("User", userSchema);