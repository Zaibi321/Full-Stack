import express from 'express'
import Database from '../Database.js';
const router = express.Router();
router.use(express.json());

async function HandleSearch(parameter){
    const data = await Database.query(`select * from products where lower(productname) like '%${parameter}%'`);
    if(data){
        return data.rows;
    }

}
router.post("/", async (req,res) => {
    const q = req.query.q?.toLowerCase() || "";
    const Loaded = await HandleSearch(q);
    res.json(Loaded)
 
})

export default router;