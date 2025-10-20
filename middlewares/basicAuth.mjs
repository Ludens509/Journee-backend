// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const protect =  (req, res, next)=> {
//     let token = req.header("x-auth-token");

//     if (!token) 
//         return res.status(401).json({ errors: [{ msg: "No Token,Auth denied" }] });

//         try {
//             const decoded = jwt.verify(token, process.env.jwtSecret);

//             req.user = decoded.user; //this is user ID
//             next();
//         } catch (err) {
//             console.error(err.message);
//             res.status(401).json({ errors: [{ msg: "Authentication Failed" }] });
//         }
    
// }
// export  {protect}

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Middleware when you need full user data
export const protect =  async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ 
      message: "No token, authorization denied" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    
    // Import User model dynamically to avoid circular dependencies
    const { default: User } = await import("../models/userModel.mjs");
    
    // Fetch full user object from database
    const user = await User.findById(decoded.user.id).select("-password");
    
    if (!user) {
      return res.status(401).json({ 
        message: "User not found" 
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication failed:", error.message);
    return res.status(401).json({ 
      message: "Token is not valid" 
    });
  }
};