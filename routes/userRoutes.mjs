import { Router } from "express";
import { check } from "express-validator";
import userCTRL from "../controllers/userController.mjs";

const router = Router();

router.route("/").post(
    [
        check("username", "Please include a valid username").isLength({ min: 4 }),
        check("password", "password must be at least 4 characters long").isLength({min:4}),
        check("email", "Please include a valid email").isEmail(),
    ],
    userCTRL.registerUser)

export default router;