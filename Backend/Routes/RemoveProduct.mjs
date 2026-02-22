import express from "express"
import fs from "fs"
const router = express.Router();
router.use(express.json());


function RemoveProduct(id){
    const Cart_File = fs.readFileSync("/home/shahzaib/Downloads/Project/Data/Data2.json","utf-8");
    const cart = JSON.parse(Cart_File);
    cart.splice(id,1);
fs.writeFileSync("/home/shahzaib/Downloads/Project/Data/Data2.json", JSON.stringify(cart, null, 2));
    
    
}
router.post("/",(req, res) => {
    const  {productID} =  req.body;
    RemoveProduct(productID);
})

export default router;