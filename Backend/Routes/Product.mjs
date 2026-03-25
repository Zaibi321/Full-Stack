import express from'express';
import Databse from "../Database.js"

const router = express.Router();
router.use(express.json())
router.post("/",async (req, res) => {
    const {ID} = req.body;
    try{
        const result = await Databse.query(`SELECT * FROM products WHERE productid = ${ID}`);
        res.json(result.rows);
    }catch(error){
     console.log("error fetching product",error);
    }
})


export default router;