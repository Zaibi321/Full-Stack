import express from "express";
import fs from "fs";

const router = express.Router();
router.use(express.json());


function HandleFilter(min, max){
    const Data = JSON.parse(fs.readFileSync("/home/shahzaib/Downloads/Project/Data/Data2.json", "utf-8"));
    const results = Data.filter(p => p.price >= min && p.price <= max);
    return results;
}

router.post("/", (req,res) => {

    const {min,max} = req.body;
   const filtered = HandleFilter(min,max);
   res.json(filtered);
})


export default router;