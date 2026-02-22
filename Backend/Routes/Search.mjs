import express from 'express'
import fs from "fs"

const router = express.Router();
router.use(express.json());

function HandleSearch(parameter){
const Data = JSON.parse(fs.readFileSync("/home/shahzaib/Downloads/Project/Data/Data2.json", "utf-8"));
  const results = Data.filter(p =>
    p.name.toLowerCase().includes(parameter))
    return results;

}
router.post("/", (req,res) => {
    const q = req.query.q?.toLowerCase() || "";
    const Loaded = HandleSearch(q);
    if(Loaded.length === 0){
        res.json({success : false})

    }
    else{
         res.json({success : true,
                   products : Loaded
          }); 

    }
})

export default router;