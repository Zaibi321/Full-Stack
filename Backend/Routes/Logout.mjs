import cookieParser from "cookie-parser";
import express from "express"
const router = express.Router();
router.use(cookieParser());

router.get("/" ,(req,res)=>{
        res.clearCookie("token"),{
                httpOnly : true,
                secure : process.env.NODE_ENV === "production",
                sameSite : "strics",
                path : '/'
        }
        res.json({logout: true})
})


export default router;