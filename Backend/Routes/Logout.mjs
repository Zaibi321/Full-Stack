import cookieParser from "cookie-parser";
import express from "express"
const router = express.Router();
router.use(cookieParser());

router.get("/" ,(req,res)=>{
        res.clearCookie("tokken");
        res.json({logout: true})
})


export default router;