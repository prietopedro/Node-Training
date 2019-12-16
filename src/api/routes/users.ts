import {Router} from "express"
const route = Router();

route.get('/',(req,res)=>{
    res.json({message: "hello world"})
})

export default route;