import express from "express"
import cookieparser from "cookie-parser";
import Database from "../Database.js"
import bcrypt from "bcrypt";
import {config} from 'dotenv';
const router = express.Router();
import jwt from "jsonwebtoken"
config();



async function VerifyPassword(user,pass){
         const result = await Database.query(`Select password from USERS where USERNAME = $1`,[user]);
         if(result.rows.length === 0){
          return false;
         }
         const valid = await bcrypt.compare(pass, result.rows[0].password);
         return valid;
}

router.post("/", async (req, res) => {


    try{
       const { user, pass } = req.body;
       if(!user || !pass || typeof user !== "string" || typeof pass !== "string"){
            return  res.status(400).json({ message: "Invalid Input" });
       };

       const verification =await VerifyPassword(user,pass);
       if(!verification){
           return res.status(401).json({message : 'Username or Password is Incorrect'});
      }
        

       const token =  jwt.sign({ username: user},
           process.env.SECRET_KEY,
           {expiresIn : '1h'}
       )
       res.cookie("token", token , {
          httpOnly : true,
          secure : false,
          sameSite : "strict",
          maxAge : 3600000,
          path : '/',
     })
       res.json({success : true});
   

     }
     catch(error)
        {
          res.status(501).json({message : 'Internal Server Error'})
       }

   });

   export default router;