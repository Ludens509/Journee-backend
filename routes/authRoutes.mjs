import { Router } from "express";
import { check } from "express-validator";
import userCTRL from "../controllers/userController.mjs"
import { protect } from "../middlewares/basicAuth.mjs";

const router = Router();

router.route("/").get(protect, userCTRL.getUserInfo)
    .post(
        [

            check("password", "password must be at least 4 characters long").isLength({ min: 4 }),
            check("email", "Please include a valid email").isEmail(),
        ],
        userCTRL.loginUser
    );

export default router;