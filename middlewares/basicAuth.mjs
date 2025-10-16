import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const protect =  (req, res, next)=> {
    let token = req.header("x-auth-token");

    if (!token) 
        return res.status(401).json({ errors: [{ msg: "No Token,Auth denied" }] });

        try {
            const decoded = jwt.verify(token, process.env.jwSecret);

            req.user = decoded.user;
            next();
        } catch (err) {
            console.err(err.message);
            res.status(401).json({ errors: [{ msg: "Authentication Failed" }] });
        }
    
}
export  {protect}