import express from'express';
import fs from "fs"
const Data = JSON.parse(fs.readFileSync("/home/shahzaib/Downloads/Project/Data/Data2.json", "utf-8"));

const router = express.Router();
router.use(express.json())
router.post("/",(req, res) => {
    const {ID1} = req.body;
    res.json(Data[ID1])
})


export default router;