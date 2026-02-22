import express from 'express';
import fs from "fs"
const router = express.Router();
router.use(express.json());


function addtoCart(productid){
    const data = fs.readFileSync("/home/shahzaib/Downloads/Project/Data/Cart_Data.mjs","utf-8");
    const cart = JSON.parse(data);

    cart.push({
        id : productid
    })
     fs.writeFileSync("/home/shahzaib/Downloads/Project/Data/Cart_Data.mjs", JSON.stringify(cart, null, 2));

}

router.post("/", (req, res) =>  {
    const {product_id} = req.body;
    console.log(product_id);
    if(product_id){
        addtoCart(product_id)
        res.json({success : true})
    }
    else{
        res.json({success : false})
    }
   
})


export default router;