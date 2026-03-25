import express from "express";
import Database from '../Database.js'
const router = express.Router();
router.use(express.json());


function RemoveProduct(id){
  const result = Database.query(`DELETE FROM PRODUCTS WHERE PRODUCTID = $1`,[id]);    
    
}
router.post("/",(req, res) => {
    const  {productID} =  req.body;
    RemoveProduct(productID);
})

export default router;