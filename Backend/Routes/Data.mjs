import express from 'express'
const router = express.Router();
import Databse from "../Database.js"


router.use(express.json())
router.get("/", async (req, res) => {
  try{
    const result = await Databse.query("SELECT * FROM products");
    res.json(result.rows);
  }catch(err){
    res.status(500).json({ error: "Database query error" });
  }
})
  
export default router;