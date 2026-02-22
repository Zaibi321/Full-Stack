import express from 'express'
import fs from "fs";
import path from "path";
const router = express.Router();


router.use(express.json())
router.get("/", (req, res) => {  const products = JSON.parse(fs.readFileSync("/home/shahzaib/Downloads/Project/Data/Data2.json", "utf-8"));
  console.log(products.length);
  res.json(products);
})
  
export default router;