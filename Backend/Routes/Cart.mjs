import Database from '../Database.js';
import express from 'express';
const router = express.Router();

router.use(express.json());


async function addtoCart(productid){
   
     const results = await Database.query(`INSERT INTO Cart (ProductID) VALUES (${productid}) returning *`);
     if(results.rowCount > 0){
        return true;
     }
     else{
        return false;
     }
     
}

router.post("/", (req, res) =>  {
    const {product_id} = req.body;
    if(product_id){
       const status= addtoCart(product_id);
       if(status){
        res.json({success : true})
       }
       else{
        res.json({success : false})
       }
    }
    else{
        res.json({success : false})
    }
   
})


export default router;