import express from "express"
import cookieparser from "cookie-parser";
import bcrypt from "bcrypt";
import fs from "fs";
import {config} from 'dotenv';
const router = express.Router();
import jwt from "jsonwebtoken"
const file = "/home/shahzaib/Downloads/Project/Data/Users.json";
config();

router.post("/", (req, res) => {
    const { user, pass } = req.body;
      const products = JSON.parse(fs.readFileSync(file, "utf-8"));
      const foundUser = products.find(u => u.username === user && u.password === pass);
      if(!foundUser){
      return  res.status(401).json({ message: "Invalid username or password" });
      }
  const token=  jwt.sign({ username: foundUser.username},
               process.env.SECRET_KEY,
               { expiresIn: "1h" }
    )
  res.cookie("tokken", token , {
    httpOnly : true,
     secure : false,
      sameSite : "strict",
  })
    res.json({accesToken : token , success : true});
 
   });

   export default router;