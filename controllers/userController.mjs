import User from "../models/userModel.mjs"
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

dotenv.config();

const registerUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const { username, email, password } = req.body;

        let user = await User.findOne({ email });

        if (user) {
            res.status(400).json({ errors: [{ msg: "User Exists" }] })
        }

        // const newUser = await User.create(req.body);
        // res.status(201).json(newUser);

        user = new User({
            username,
            email,
            password,
        });


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const payload = {
            user: {
                id: user._id,
            },
        }

        jwt.sign(payload, process.env.jwtSecret, { expiresIn: "6h" }, (err, token) => {
            if (err) throw err;

            res.status(201).json({ token });
        }

        );

    } catch (err) {
        console.error(`Error - ${err.message}`);
        res.status(500).json({ msg: `Error - ${err.message}` });
    }

}

const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: "Server Error" }] });
    }
}

const loginUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { email, password } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400), json({ errors: [{ msg: "Invalid Credentials" }] })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] })
        }

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(
            payload, process.env.jwtSecret, { expiresIn: "6h" },
            (err, token) => {
                if (err) throw err;

                res.status(201).json(token);
            }
        );

    } catch (err) {
        console.error(`Error - ${err.message}`);
        res.status(500).json({ msg: `Error - ${err.message}` });

    }
}

export default {
    registerUser, getUserInfo, loginUser
}
