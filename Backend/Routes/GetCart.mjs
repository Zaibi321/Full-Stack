import express from 'express';
import Database from '../Database.js';
const router = express.Router();
router.use(express.json());


router.get("/", async (req, res) =>  {
    const data = await Database.query(`select * from products where productid in (select ProductID from Cart)`);   
    if(data){
        res.json(data.rows);
    } 
})


export default router;
