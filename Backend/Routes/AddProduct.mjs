import express from "express"
import fs from "fs"

const router = express.Router();
router.use(express.json());



function AddProductToData(NAME,deetail,price,image){
    const Data = JSON.parse(fs.readFileSync("/home/shahzaib/Downloads/Project/Data/Data2.json", "utf-8"));

    Data.push({
        id:Data.length + 1,
        name : NAME,
        description : deetail,
        price : price,
        img : image
    })
    fs.writeFileSync("/home/shahzaib/Downloads/Project/Data/Data2.json", JSON.stringify(Data, null, 2));


}
router.post("/", (req, res) => {
    const {name , description,price, image} = req.body;
    AddProductToData(name,description,price,image);
})

export default router;