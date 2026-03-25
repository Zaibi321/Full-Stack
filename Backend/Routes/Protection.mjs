import express, { Router } from "express";
import cookieparser from "cookie-parser";
import jwt from "jsonwebtoken";


const router = express.Router();
router.use(cookieparser());
function checklogin(req, res, next) {
  const token = req.cookies.token;
  if(!token){
      return res.status(401).json({message : "Access Denied" });
   }
  try{
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verified;
    next();
  }catch(err){
    res.clearCookie('token') , {path : '/'}
    res.status(403).json({message : "Invalid Token"});
  }




}

router.get("/", checklogin, (req, res) => {

  res.json({ message: `Welcome ${req.user.username}` })

})


export default router;