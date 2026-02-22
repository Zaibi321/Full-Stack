import express from 'express';
// import Data from "/home/shahzaib/Downloads/Project/Data/Data2.mjs"
import fs from "fs"
const router = express.Router();
router.use(express.json());



function showCart(){
        const Data = JSON.parse(fs.readFileSync("/home/shahzaib/Downloads/Project/Data/Data2.json", "utf-8"));
        const Cart_File = fs.readFileSync("/home/shahzaib/Downloads/Project/Data/Cart_Data.mjs","utf-8");
        const cart = JSON.parse(Cart_File);
        let fulldata= {};
       let products = Object.values(cart);
       products.forEach((product,index)=> {
        fulldata[index] = Data[product.id-1];
     
    })
       return fulldata;
}


router.get("/", (req, res) =>  {
    const data = showCart();
    res.json(data);
 
})


export default router;
