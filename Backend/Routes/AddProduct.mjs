import express from "express";
import Database from '../Database.js';
const router = express.Router();
router.use(express.json());



function AddProductToData(name,detail,price,image){
    const result = Database.query(`INSERT INTO Products (ProductName, Price, DESCRIPTION, IMAGE_URL) VALUES 
                         (${name},${price} ,${detail}, ${image})`)
}
router.post("/", (req, res) => {
    const {name , description,price, image} = req.body;
    AddProductToData(name,description,price,image);
})

export default router;